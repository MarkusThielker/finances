import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"

export const load: PageServerLoad = async ({locals, request}) => {
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

            const key = await auth.useKey("username", username, password)
            const session = await auth.createSession(key.userId)
            locals.setSession(session)

        } catch {
            // invalid credentials
            return fail(400)
        }
    },
}
