import { IBodyCreateItemOutModel } from "./item-out.model"
import * as itemRepository from "../item/item.repository";
import * as itemOutRepository from "./item-out.repository";
import { ADMIN_ROLE } from "@prisma/client";
import { AppError } from "../../middleware/error-handler";
import { ERROR_CODE, IQueryParams } from "../../interface";
import { metaPagination } from "../../utils/meta-pagination";
import { mapperItemOut } from "./item-out.mapper";

export const createItemOut = async ({
    body,
    token
}: {
    body: IBodyCreateItemOutModel,
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

    if (cekItem.stock < body.amount) {
        return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Stock tidak mencukupi')
    }

    await itemRepository.stockItemReduction({
        itemId: itemId,
        stock: amount
    })

    return await itemOutRepository.createItemOut({
        data: body,
        adminId: token.id
    })
}

export const getAllItemOut = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemOutRepository.getAllItemOut({
        query
    })

    const count = await itemOutRepository.getCountAllItemOut({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItemOut(data), meta }
}
