import { lucia } from "lucia"
import { sveltekit } from "lucia/middleware"
import { prisma } from "@lucia-auth/adapter-prisma"
import { prismaClient } from "./prisma"
import { dev } from "$app/environment"

export const auth = lucia({
    adapter: prisma(prismaClient),
    // always using 'DEV' if deployed to non-https domain
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    getUserAttributes: (data) => {
        return {
            username: data.username,
        }
    },
})

export type Auth = typeof auth
