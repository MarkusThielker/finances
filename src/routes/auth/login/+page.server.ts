import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"

export const load: PageServerLoad = async ({locals, request}) => {
    const session = await locals.validate()
    if (session) throw redirect(302, "/")
    return {}
}

export const actions: Actions = {
    default: async ({request, locals}) => {

        const form = await request.formData()
        const username = form.get("username") as string
        const password = form.get("password") as string

        // check for empty values
        if (username.trim().length == 0 || password.length == 0) {
            return {
                error: {
                    username: username.length == 0
                        ? "Username is required"
                        : undefined,
                    password: password.length == 0
                        ? "Password is required"
                        : undefined,
                },
            }
        }

        try {

            const key = await auth.useKey("username", username, password)
            const session = await auth.createSession(key.userId)
            locals.setSession(session)

        } catch {
            return {
                error: {
                    general: "Invalid username or password",
                },
            }
        }
    },
}
