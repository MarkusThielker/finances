import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"
import { EntityType } from "@prisma/client"
import { Scope, ScopeType } from "$lib/server/scope"

export const load: PageServerLoad = async ({locals}) => {

    const {user} = await locals.validateUser()
    if (!user) throw redirect(302, LOGIN_URL)

    const preference = await prismaClient.preference.findFirst({where: {userId: user.userId, key: "scope"}})
    const scope = Scope.of(preference?.value as ScopeType ?? ScopeType.ThisMonth)

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

    let income = BigInt(0)
    let expenses = BigInt(0)

    payments.filter(payment =>
        payment.payor.type === EntityType.Entity &&
        payment.payee.type === EntityType.Account,
    ).forEach(payment => income += payment.amount)

    payments.filter(payment =>
        payment.payor.type === EntityType.Account &&
        payment.payee.type === EntityType.Entity,
    ).forEach(payment => expenses += payment.amount)

    const balanceDevelopment = income - expenses
    const scopes = Object.values(ScopeType).
        map(scopeType => scopeType.toString())

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
