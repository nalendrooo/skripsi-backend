import * as itemRepository from "../item/item.repository";
import * as itemRestockRepository from "./item-restock.repository";
import { ADMIN_ROLE } from "@prisma/client";
import { AppError } from "../../middleware/error-handler";
import { ERROR_CODE, IQueryParams } from "../../interface";
import { metaPagination } from "../../utils/meta-pagination";
import { IBodyCreateItemRestockModel } from "./item-restock.model";
import { mapperItemRestock } from "./item-restock.mapper";

export const createItemRestock = async ({
    body,
    token
}: {
    body: IBodyCreateItemRestockModel,
    token: {
        name: string
        id: number
        telephone: string
        role: ADMIN_ROLE
    }
}) => {
    const { itemId, amount } = body

    const cekItem = await itemRepository.getItemById({
        itemId: itemId
    })

    if (!cekItem) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Item tidak ditemukan')
    }

    await itemRepository.stockItemRestock({
        itemId: itemId,
        stock: amount
    })

    const last = await itemRestockRepository.getLastDataItemRestock()
    let nextNumber = 1;

    if (last && last.code) {
        const match = last.code.match(/IN-(\d+)/);
        if (match && match[1]) {
            nextNumber = parseInt(match[1], 10) + 1;
        }
    }

    const code = 'IN-' + nextNumber.toString().padStart(6, '0');

    return await itemRestockRepository.createItemRestock({
        data: body,
        code,
        adminId: token.id
    })
}

export const getAllItemRestock = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemRestockRepository.getAllItemRestock({
        query
    })

    const count = await itemRestockRepository.getCountAllItemRestock({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItemRestock(data), meta }
}
