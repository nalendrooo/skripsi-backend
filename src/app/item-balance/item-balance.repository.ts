import { IQueryParams } from "../../interface";
import { prisma } from "../../setup/prisma";
import { IBodyCreateItemBalanceModel } from "./item-balance.model";

export const createItemBalance = async ({
    data,
    adminId,
    initialStock,
    finalStock
}: {
    data: IBodyCreateItemBalanceModel,
    finalStock: number
    initialStock: number
    adminId: number
}) => {
    return await prisma.itemBalance.create({
        data: {
            ...data,
            finalStock,
            initialStock,
            adminId,
        }
    });
};

export const getAllItemBalance = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 10,
        search = ''
    } = query

    return await prisma.itemBalance.findMany({
        select: {
            admin: {
                select: {
                    name: true
                }
            },
            description: true,
            finalStock: true,
            initialStock: true,
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
            
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}
export const getCountAllItemBalance = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search
    } = query

    return await prisma.itemBalance.count()
}