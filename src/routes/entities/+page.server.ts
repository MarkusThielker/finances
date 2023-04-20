import type { PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"

export const load: PageServerLoad = async ({locals}) => {

    const {user} = await locals.validateUser()
    if (!user) throw redirect(302, LOGIN_URL)

    const entities = await prismaClient.entity.findMany()

    return {
        user,
        entities,
    }
}
