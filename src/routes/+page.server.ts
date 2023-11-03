import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"
import { EntityType, type Category, type Entity } from "@prisma/client"
import { Scope, ScopeType } from "$lib/server/scope"

type CategoryNumber = {
    category: Category,
    value: bigint,
}

type EntityNumber = {
    entity: Entity,
    value: bigint,
}

export const load: PageServerLoad = async ({locals}) => {

    const {user} = await locals.validateUser()
    if (!user) throw redirect(302, LOGIN_URL)

    const preference = await prismaClient.preference.findFirst({where: {userId: user.userId, key: "scope"}})
    const scope = Scope.of(preference?.value as ScopeType ?? ScopeType.ThisMonth)

    // get all payments in the current scope
    const payments = await prismaClient.payment.findMany({
        where: {
            userId: user.userId,
            date: {
                gte: scope.start,
                lte: scope.end,
            },
        },
        include: {
            payor: true,
            payee: true,
            category: true,
        },
    })

    let income = 0n
    let expenses = 0n

    // sum up income
    payments.filter(payment =>
        payment.payor.type === EntityType.Entity &&
        payment.payee.type === EntityType.Account,
    ).forEach(payment => income += payment.amount)

    // sum up expenses
    payments.filter(payment =>
        payment.payor.type === EntityType.Account &&
        payment.payee.type === EntityType.Entity,
    ).forEach(payment => expenses += payment.amount)


    // ############################
    // Expenses by category
    // ############################

    // init helper variables (category)
    const categoryExpenses: CategoryNumber[] = []
    const otherCategory: CategoryNumber = { 
        category: {
            id: 0,
            userId: "",
            name: "Other",
            color: "#888888",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        value: 0n
    }

    // sum up expenses per category
    payments.filter(payment =>
        payment.payor.type === EntityType.Account &&
        payment.payee.type === EntityType.Entity,
    ).forEach(payment => {

        if (!payment.category) {
            otherCategory.value += payment.amount
            return
        }

        const categoryNumber = categoryExpenses.find(categoryNumber => categoryNumber.category.id === payment.category?.id)
        if (categoryNumber) {
            categoryNumber.value += payment.amount
        } else {
            categoryExpenses.push({category: payment.category, value: payment.amount})
        }
    })
    categoryExpenses.sort((a, b) => Number(b.value - a.value))
    if (otherCategory.value > 0) { categoryExpenses.push(otherCategory) }


    // ############################
    // Expenses by entity
    // ############################

    // init helper variables (entity)
    const entityExpenses: EntityNumber[] = []
    const otherEntity: EntityNumber = { 
        entity: {
            id: 0,
            userId: "",
            name: "Other",
            type: EntityType.Entity,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        value: 0n
    }

    // sum up expenses per category
    payments.filter(payment =>
        payment.payor.type === EntityType.Account &&
        payment.payee.type === EntityType.Entity,
    ).forEach(payment => {

        // if (!payment.payee) {
        //     other.value += payment.amount
        //     return
        // }

        const entityNumber = entityExpenses.find(entityNumber => entityNumber.entity.id === payment.payee?.id)
        if (entityNumber) {
            entityNumber.value += payment.amount
        } else {
            entityExpenses.push({entity: payment.payee, value: payment.amount})
        }
    })
    entityExpenses.sort((a, b) => Number(b.value - a.value))
    if (otherEntity.value > 0) { entityExpenses.push(otherEntity) }

    // ############################


    const balanceDevelopment = income - expenses
    const scopes = Object.values(ScopeType).map(scopeType => scopeType.toString())

    return {
        user: user,
        scope: scope.type,
        scopes: scopes,
        income: new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(Number(income) / 100),
        expenses: new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(Number(expenses) / 100),
        balanceDevelopment: new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(Number(balanceDevelopment) / 100),
        categoryExpenses: categoryExpenses.map(categoryNumber => ({
            category: categoryNumber.category,
            value: new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(Number(categoryNumber.value) / 100),
        })),
        categoryPercentages: categoryExpenses.map(categoryNumber => ({
            category: categoryNumber.category,
            value: amountToPercent(categoryNumber.value, expenses),
        })),
        entityExpenses: entityExpenses.map(entityNumber => ({
            entity: entityNumber.entity,
            value: new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(Number(entityNumber.value) / 100),
        })),
        entityPercentages: entityExpenses.map(entityNumber => ({
            entity: entityNumber.entity,
            value: amountToPercent(entityNumber.value, expenses),
        })),
    }
}

export const actions: Actions = {
    updateScope: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const formData = await request.formData()
        const value = formData.get("scope") as ScopeType

        const preference =
            await prismaClient.preference.findFirst({where: {userId: user.userId, key: "scope"}})

        if (preference) {
            await prismaClient.preference.update({
                where: {id: preference.id},
                data: {value: value},
            })
        } else {
            await prismaClient.preference.create({
                data: {
                    userId: user.userId,
                    key: "scope",
                    value: value,
                },
            })
        }
    },
}

function amountToPercent(amount: bigint, total: bigint): string {
    return (Number(amount)/Number(total)*100).toFixed(2)
}
