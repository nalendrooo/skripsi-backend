import { IQueryParams } from "../../interface"
import { prisma } from "../../setup/prisma"
import { IBodyCreateItemModel } from "./item.model"

export const getItemById = async ({
    itemId
}: {
    itemId?: number
}) => {
    return await prisma.item.findFirst({
        where: {
            id: itemId
        }
    })
}

// export const updateUnitById = async ({
//     unitId,
//     data
// }: {
//     unitId?: number,
//     data: IBodyCreateUnitModel
// }) => {
//     return await prisma.unit.update({
//         where: {
//             id: unitId
//         },
//         data
//     })
// }

export const getAllItem = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 10,
        search
    } = query

    return await prisma.item.findMany({
        where: {
            title: {
                contains: search
            }
        },
        include: {
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
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}

export const getCountAllItem = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search
    } = query

    return await prisma.item.count({
        where: {
            title: {
                contains: search
            }
        },
    })
}

export const createItem = async ({
    data,
}: {
    data: IBodyCreateItemModel,
}) => {
    return await prisma.item.create({
        data
    })
}

export const stockItemReduction = async ({
    itemId,
    stock
}: {
    itemId: number,
    stock: number
}) => {
    return await prisma.item.update({
        where: {
            id: itemId
        },
        data: {
            stock: {
                decrement: stock
            }
        }
    })
}

export const stockItemRestock = async ({
    itemId,
    stock,
}: {
    itemId: number;
    stock: number;
}) => {
    return await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            stock: {
                increment: stock,
            },
        },
    });
};
