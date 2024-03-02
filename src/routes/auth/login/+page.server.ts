import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";

export const load: PageServerLoad = async ({locals, request}) => {
    const session = await locals.validate()
    if (session) redirect(302, "/");
    return {
        form: await superValidate(zod(formSchema)),
    }
}

export const actions: Actions = {
    default: async (event) => {

        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, { form });
        }

        try {

            const key = await auth.useKey(
                "username",
                form.data.username,
                form.data.password
            )
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            })
            event.locals.setSession(session)

            return { form };

        } catch {
            return {
                error: {
                    general: "Invalid username or password",
                },
            }
        }
    },
}
