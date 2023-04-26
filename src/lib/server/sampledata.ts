import { prismaClient } from "$lib/server/prisma"
import { EntityType } from "@prisma/client"

export async function createSampleData(
    userId: string,
) {

    const user = prismaClient.authUser.findFirst({
        where: { id: userId }
    })
    if(!user) return

// Categories: create sample data
    if (await prismaClient.category.count() == 0) {

        console.log("Creating sample categories...")

        await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Groceries",
                color: "#FFBEAC",
            },
        })

        await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Drugstore items",
                color: "#9CBCFF",
            },
        })

        await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Going out",
                color: "#F1ADFF",
            },
        })

        await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Random stuff",
                color: "#C1FFA9",
            },
        })

        await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Salary",
                color: "#FFF787",
            },
        })

        console.log("Sample categories created.")
    }

// Entities: create sample data
    if (await prismaClient.entity.count() == 0) {

        console.log("Creating sample entities...")

        await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Main Account",
                identifier: "DE23894788934786293762",
                type: EntityType.Account,
            },
        })

        await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Company",
                identifier: "company",
                type: EntityType.Entity,
            },
        })

        await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 1",
                identifier: "sm_1",
                type: EntityType.Entity,
            },
        })

        await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 2",
                identifier: "sm_2",
                type: EntityType.Entity,
            },
        })

        await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 3",
                identifier: "sm_3",
                type: EntityType.Entity,
            },
        })

        await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 4",
                identifier: "sm_4",
                type: EntityType.Entity,
            },
        })

        console.log("Sample entities created.")
    }

// Payments: create sample data

    console.log("Creating sample payments...")

    for (let i = 0; i < 4; i++) {

        const date = new Date()
        date.setDate(1)
        date.setMonth(date.getMonth() - i)

        await prismaClient.payment.create({
            data: {
                userId: userId,
                amount: 200000,
                date: date,
                payorId: 2,
                payeeId: 1,
                categoryId: 5,
                createdAt: date,
                updatedAt: date,
            },
        })
    }

    let minAmount = 200 // 2€
    let maxAmount = 3000 // 30€
    let minPayee = 3
    let maxPayee = 6
    let minCategory = 1
    let maxCategory = 5
    let payments = 196

    for (let i = 0; i < payments; i++) {

        const date = new Date(
            new Date().getTime() - Math.floor(Math.random() * 10000000000))

        await prismaClient.payment.create({
            data: {
                userId: userId,
                amount: Math.floor(
                    Math.random() * (maxAmount - minAmount) + minAmount),
                date: date,
                payorId: 1,
                payeeId: Math.floor(
                    Math.random() * (maxPayee - minPayee) + minPayee),
                categoryId: Math.floor(
                    Math.random() * (maxCategory - minCategory) + minCategory),
                createdAt: date,
                updatedAt: date,
            },
        })
    }

    console.log("Sample payments created.")
}
