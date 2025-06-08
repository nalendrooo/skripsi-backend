import { IQueryParams } from "../../interface";
import { prisma } from "../../setup/prisma";
import { IBodyCreateItemRestockModel } from "./item-restock.model";

export const createItemRestock = async ({
    data,
    adminId
}: {
    data: IBodyCreateItemRestockModel
    adminId: number
}) => {
    return await prisma.itemRestock.create({
        data: { ...data, adminId }
    });
};

export const getAllItemRestock = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 10,
        search = ''
    } = query
    return await prisma.itemRestock.findMany({
        where: {
            OR: [
                { item: { title: { contains: search } } },
            ]
        },
        select: {
            admin: {
                select: {
                    name: true
                },
            },
            amount: true,
            createdAt: true,
            description: true,
            news: true,
            item: {
                select: {
                    brand: true,
                    category: {
                        select: {
                            title: true
                        },
                    },
                    unit: {
                        select: {
                            title: true
                        },
                    },
                    title: true,
                    code: true,
                    supplier: true,
                    location: true,
                },
            }
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    });
};

export const getCountAllItemRestock = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 10,
        search = ''
    } = query

    return await prisma.itemRestock.count({
        where: {
            OR: [
                { item: { title: { contains: search } } },
            ]
        },
    });
};