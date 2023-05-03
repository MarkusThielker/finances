import type { Actions, PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"
import type { EntityType } from "@prisma/client"

export const load: PageServerLoad = async ({locals}) => {

    const {user} = await locals.validateUser()
    if (!user) throw redirect(302, LOGIN_URL)

    const entities = await prismaClient.entity.findMany({
        where: {
            userId: user.userId,
        },
    })

    return {
        user,
        entities,
    }
}

export const actions: Actions = {
    create: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const {
            name,
            identifier,
            type,
        } = readFormData(await request.formData())

        console.log("After parse: ", {name, identifier, type})

        try {
            await prismaClient.entity.create({
                data: {
                    userId: user.userId,
                    name,
                    identifier,
                    type,
                },
            })
        } catch (e) {
            throw error(400, "Invalid entity data")
        }

        return
    },
    update: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const formData = await request.formData()

        const id = Number(formData.get("id") as string)
        if (!id) return error(400, "Invalid entity id")

        const {
            name,
            identifier,
            type,
        } = readFormData(formData)

        try {
            await prismaClient.entity.update({
                where: {id},
                data: {
                    name,
                    identifier,
                    type,
                },
            })
        } catch (e) {
            return error(400, "Invalid entity data")
        }

        return
    },
    remove: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const formData = await request.formData()

        const id = Number(formData.get("id") as string)
        if (!id) return error(400, "Invalid entity id")

        try {
            await prismaClient.entity.delete({where: {id}})
        } catch (e) {
            return error(400, "Invalid entity data")
        }

        return
    },
}

function readFormData(formData: FormData) {

    const name = formData.get("name") as string
    const identifier = formData.get("identifier") as string
    const type = formData.get("type") as EntityType

    return {
        name,
        identifier,
        type,
    }
}
