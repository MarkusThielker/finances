import { prismaClient } from "$lib/server/prisma"
import type { Category, Entity } from "@prisma/client"
import { EntityType } from "@prisma/client"

export async function createSampleData(
    userId: string,
) {

    const user = prismaClient.authUser.findFirst({
        where: {id: userId},
    })
    if (!user) return

// Categories: create sample data
    const categories: Category[] = await prismaClient.category.findMany({where: {userId: userId}})
    if (await prismaClient.category.count({where: {userId: userId}}) == 0) {

        console.log("Creating sample categories...")

        categories.push(await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Groceries",
                color: "#FFBEAC",
            },
        }))

        categories.push(await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Drugstore items",
                color: "#9CBCFF",
            },
        }))

        categories.push(await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Going out",
                color: "#F1ADFF",
            },
        }))

        categories.push(await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Random stuff",
                color: "#C1FFA9",
            },
        }))

        categories.push(await prismaClient.category.create({
            data: {
                userId: userId,
                name: "Salary",
                color: "#FFF787",
            },
        }))

        console.log("Sample categories created.")
    }
    console.log(categories)

// Entities: create sample data
    const entities: Entity[] = await prismaClient.entity.findMany({where: {userId: userId}})
    if (await prismaClient.entity.count({where: {userId: userId}}) == 0) {

        console.log("Creating sample entities...")

        entities.push(await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Main Account",
                type: EntityType.Account,
            },
        }))

        entities.push(await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Company",
                type: EntityType.Entity,
            },
        }))

        entities.push(await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 1",
                type: EntityType.Entity,
            },
        }))

        entities.push(await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 2",
                type: EntityType.Entity,
            },
        }))

        entities.push(await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 3",
                type: EntityType.Entity,
            },
        }))

        entities.push(await prismaClient.entity.create({
            data: {
                userId: userId,
                name: "Supermarket 4",
                type: EntityType.Entity,
            },
        }))

        console.log("Sample entities created.")
    }
    console.log(entities)

// Payments: create sample data
    console.log("Creating sample payments...")

    if (await prismaClient.payment.count({where: {userId: userId}}) == 0) {
        for (let i = 0; i < 4; i++) {

            const date = new Date()
            date.setDate(1)
            date.setMonth(date.getMonth() - i)

            await prismaClient.payment.create({
                data: {
                    userId: userId,
                    amount: 200000,
                    date: date,
                    payorId: entities[1].id,
                    payeeId: entities[0].id,
                    categoryId: 5,
                    createdAt: date,
                    updatedAt: date,
                },
            })
        }
    }

    let minAmount = 200 // 2€
    let maxAmount = 3000 // 30€
    let minPayee = entities[2].id
    let maxPayee = entities[entities.length - 1].id
    let minCategory = categories[0].id
    let maxCategory = categories[categories.length - 1].id
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
