import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({locals}) => {
    return await locals.validate()
}
