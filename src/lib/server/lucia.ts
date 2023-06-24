import lucia from "lucia-auth"
import { sveltekit } from "lucia-auth/middleware"
import prisma from "@lucia-auth/adapter-prisma"
import { prismaClient } from "./prisma"

export const auth = lucia({
    adapter: prisma(prismaClient),
    // always using 'DEV' since only deployed to local server without https
    env: "DEV",
    middleware: sveltekit(),
    transformDatabaseUser: (userData) => {
        return {
            userId: userData.id,
            username: userData.username,
        }
    },
})

export type Auth = typeof auth
