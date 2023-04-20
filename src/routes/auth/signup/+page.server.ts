import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.validate()
    if (session) throw redirect(302, "/account")
    return {}
}

export const actions: Actions = {
    default: async ({request, locals}) => {

        const form = await request.formData()
        const username = form.get("username")
        const password = form.get("password")

        // check for empty values
        if (typeof username !== "string" || typeof password !== "string") {
            return fail(400)
        }

        try {

            const user = await auth.createUser({
                primaryKey: {
                    providerId: "username",
                    providerUserId: username,
                    password,
                },
                attributes: {
                    username: username,
                },
            })

            const session = await auth.createSession(user.userId)
            locals.setSession(session)

        } catch {
            // username already in use
            return fail(400)
        }
    },
}
