import lucia from "lucia-auth"
import { sveltekit } from "lucia-auth/middleware"
import prisma from "@lucia-auth/adapter-prisma"
import { prismaClient } from "./prisma"
import { dev } from "$app/environment"

export const auth = lucia({
    adapter: prisma(prismaClient),
    // always using 'DEV' if deployed to non-https domain
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    transformDatabaseUser: (userData) => {
        return {
            userId: userData.id,
            username: userData.username,
        }
    },
})

export type Auth = typeof auth
