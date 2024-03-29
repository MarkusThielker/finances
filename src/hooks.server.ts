import { auth } from "$lib/server/lucia"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({event, resolve}) => {
    event.locals = auth.handleRequest(event)
    return resolve(event)
}
