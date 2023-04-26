import type { PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
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

    return {
        user,
        payments,
    }
}
