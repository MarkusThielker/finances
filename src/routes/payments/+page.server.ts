import type { Actions, PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"

export const load: PageServerLoad = async ({locals}) => {

    const {user} = await locals.validateUser()
    if (!user) throw redirect(302, LOGIN_URL)

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

    let entities = await prismaClient.entity.findMany({where: {userId: user.userId}})
    let categories = await prismaClient.category.findMany({where: {userId: user.userId}})

    return {
        user,
        payments,
        entities,
        categories,
    }
}

export const actions: Actions = {
    create: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const formData = await request.formData()

        const amount = Math.round(Number(formData.get("amount") as string) * 100)
        const date = new Date(formData.get("date") as string)
        const payorId = Number(formData.get("payor") as string)
        const payeeId = Number(formData.get("payee") as string)
        const categoryId = Number(formData.get("category") as string)

        try {
            await prismaClient.payment.create({
                data: {
                    userId: user.userId,
                    amount,
                    date,
                    payorId,
                    payeeId,
                    categoryId,
                }
            })
        } catch (e) {
            return error(400, "Invalid payment data")
        }

        return
    },
}
