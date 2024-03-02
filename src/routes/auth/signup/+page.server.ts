import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "../login/schema";

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.validate()
    if (session) redirect(302, "/account");
    return {
        form: await superValidate(zod(formSchema)),
    }}

export const actions: Actions = {
    default: async (event) => {

        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, { form });
        }

        try {

            const user = await auth.createUser({
                key: {
                    providerId: "username",
                    providerUserId: form.data.username,
                    password: form.data.password,
                },
                attributes: {
                    username: form.data.username,
                },
            })

            const session = await auth.createSession({
                userId: user.userId,
                attributes: {}
            })
            event.locals.setSession(session)

        } catch {
            return {
                error: {
                    username: "Username is already taken",
                },
            }
        }
    },
}
