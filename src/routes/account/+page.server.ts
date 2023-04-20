import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"
import { createSampleData } from "../../lib/server/sampledata"

export const load: PageServerLoad = async ({locals}) => {
    const {user} = await locals.validateUser()
    if (!user) throw redirect(302, LOGIN_URL)

    const entities = await prismaClient.entity.count()
    const categories = await prismaClient.category.count()
    const payments = await prismaClient.payment.count()

    return {
        user,
        entities,
        categories,
        payments,
    }
}

export const actions: Actions = {
    createSampleDate: async ({request, locals}) => {
        await createSampleData()
    },
    logout: async ({request, locals}) => {
        const session = await locals.validate()
        if (!session) return fail(401)
        await auth.invalidateSession(session.sessionId)
        locals.setSession(null)
    },
}
