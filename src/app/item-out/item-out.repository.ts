import { NEWS } from "@prisma/client"
import { prisma } from "../../setup/prisma"
import { IBodyCreateItemOutModel } from "./item-out.model"
import { IQueryParams } from "../../interface";

export const createItemOut = async ({
    data,
    adminId
}: {
    data: IBodyCreateItemOutModel
    adminId: number
}) => {
    return await prisma.itemOut.create({
        data: { ...data, adminId }
    });
};

export const getAllItemOut = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 10,
        search = ''
    } = query

    return await prisma.itemOut.findMany({
        where: {
            OR: [
                { user: { name: { contains: search } } },
                { user: { telephone: { contains: search } } }
            ]
        },
        select: {
            admin: {
                select: {
                    name: true
                }
            },
            amount: true,
            createdAt: true,
            item: {
                select: {
                    brand: true,
                    category: {
                        select: {
                            title: true
                        }
                    },
                    unit: {
                        select: {
                            title: true
                        }
                    },
                    title: true,
                    code: true,
                    supplier: true,
                    location: true,

                }
            },
            news: true,
            user: {
                select: {
                    division: {
                        select: {
                            title: true
                        }
                    },
                    name: true,
                    telephone: true,

                },

            }
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}
export const getCountAllItemOut = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search
    } = query

    return await prisma.itemOut.count({
        where: {
            OR: [
                { user: { name: { contains: search } } },
                { user: { telephone: { contains: search } } }
            ]
        },
    })
}