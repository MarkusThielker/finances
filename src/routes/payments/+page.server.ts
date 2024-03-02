import type { Actions, PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"
import type { Payment } from "@prisma/client";

export const load: PageServerLoad = async ({locals}) => {

    const session = await locals.validate()
    if (!session) redirect(302, LOGIN_URL);
    const user = session.user

    let payments = await prismaClient.payment.findMany({
        where: {
            userId: user.userId,
        },
        include: {
            payor: true,
            payee: true,
            category: true,
        },
    })
    payments = payments.sort(
        (a, b) => b.date.getTime() - a.date.getTime())

    const paymentsGrouped = new Map<number, Map<number, Payment[]>>()
    for (let payment of payments) {

        const year = payment.date.getFullYear()
        const month = payment.date.getMonth()

        const paymentsInYear: Map<number, Payment[]> = paymentsGrouped.get(year) ?? new Map<number, Payment[]>()
        const paymentsInMonth: Payment[] = paymentsInYear.get(month) ?? []
        paymentsInMonth.push(payment)

        paymentsInYear.set(month, paymentsInMonth)
        paymentsGrouped.set(year, paymentsInYear)
    }

    let entities = await prismaClient.entity.findMany(
        {where: {userId: user.userId}})
    let categories = await prismaClient.category.findMany(
        {where: {userId: user.userId}})

    return {
        user,
        payments,
        paymentsGrouped,
        entities,
        categories,
    }
}

export const actions: Actions = {
    create: async ({request, locals}) => {

        const {user} = await locals.validate()
        if (!user) redirect(302, LOGIN_URL);

        try {
            await prismaClient.payment.create({
                data: {
                    userId: user.userId,
                    ...readFormData(await request.formData()),
                },
            })
        } catch (e) {
            return error(400, "Invalid payment data")
        }

        return
    },
    update: async ({request, locals}) => {

        const { user } = await locals.validate()
        if (!user) redirect(302, LOGIN_URL);

        const formData = await request.formData()

        const id = Number(formData.get("id") as string)
        if (!id) return error(400, "Invalid payment id")

        try {
            await prismaClient.payment.update({
                where: {id},
                data: {
                    ...readFormData(formData),
                },
            })
        } catch (e) {
            return error(400, "Invalid payment data")
        }

        return
    },
    remove: async ({request, locals}) => {

        const { user } = await locals.validate()
        if (!user) redirect(302, LOGIN_URL);

        const formData = await request.formData()
        const id = Number(formData.get("id") as string)
        if (!id) error(400, "Invalid payment id");

        try {

            await prismaClient.payment.delete({where: {id}})

        } catch (e) {
            return error(400, "Invalid payment data")
        }
    },
}

function readFormData(formData: FormData) {

    const amount = Math.round(Number(formData.get("amount") as string) * 100)
    const date = new Date(formData.get("date") as string)
    const payorId = Number(formData.get("payor") as string)
    const payeeId = Number(formData.get("payee") as string)
    const note = formData.get("note") as string
    const categoryId = Number(formData.get("category") as string)

    return {
        amount,
        date,
        payorId,
        payeeId,
        note,
        categoryId,
    }
}
