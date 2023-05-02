import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.validate()
    if (session) throw redirect(302, "/account")
    return {}
}

export const actions: Actions = {
    default: async ({request, locals}) => {

        const form = await request.formData()
        const username = form.get("username") as string
        const password = form.get("password") as string

        // check for empty values
        if (username.trim().length < 3 || password.length < 8) {
            return {
                error: {
                    username: username.length < 3
                        ? "Username has to be at least 3 characters long"
                        : undefined,
                    password: password.length < 8
                        ? "Password has to be at least 8 characters long"
                        : undefined,
                },
            }
        }

        if (username.includes(" ") || password.includes(" ")) {
            return {
                error: {
                    username: username.includes(" ")
                        ? "Username cannot contain spaces"
                        : undefined,
                    password: password.includes(" ")
                        ? "Password cannot contain spaces"
                        : undefined,
                },
            }
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
            return {
                error: {
                    username: "Username is already taken",
                },
            }
        }
    },
}
