import type { Actions, PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { LOGIN_URL } from "$lib/constants"
import { prismaClient } from "$lib/server/prisma"

export const load: PageServerLoad = async ({locals}) => {

    const {user} = await locals.validateUser()
    if (!user) throw redirect(302, LOGIN_URL)

    const categories = await prismaClient.category.findMany({
        where: {
            userId: user.userId,
        },
    })

    return {
        user,
        categories,
    }
}

export const actions: Actions = {
    create: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const {
            name,
            color,
        } = readFormData(await request.formData())

        try {
            await prismaClient.category.create({
                data: {
                    userId: user.userId,
                    name,
                    color,
                },
            })
        } catch (e) {
            throw error(400, "Invalid category data")
        }

        return
    },
    update: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const formData = await request.formData()

        const id = Number(formData.get("id") as string)
        if (!id) return error(400, "Invalid category id")

        const {
            name,
            color
        } = readFormData(formData)

        try {
            await prismaClient.category.update({
                where: {id},
                data: {
                    name,
                    color,
                },
            })
        } catch (e) {
            return error(400, "Invalid category data")
        }

        return
    },
    remove: async ({request, locals}) => {

        const {user} = await locals.validateUser()
        if (!user) throw redirect(302, LOGIN_URL)

        const formData = await request.formData()

        const id = Number(formData.get("id") as string)
        if (!id) return error(400, "Invalid payment id")

        try {
            await prismaClient.category.delete({where: {id}})
        } catch (e) {
            return error(400, "Invalid category data")
        }

        return
    },
}

function readFormData(formData: FormData) {

    const name = formData.get("name") as string
    const color = formData.get("color") as string

    return {
        name,
        color,
    }
}
