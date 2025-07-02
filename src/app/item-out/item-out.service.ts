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

    const last = await itemOutRepository.getLastDataItemOut()
    let nextNumber = 1;

    if (last && last.code) {
        const match = last.code.match(/OUT-(\d+)/);
        if (match && match[1]) {
            nextNumber = parseInt(match[1], 10) + 1;
        }
    }

    const code = 'OUT-' + nextNumber.toString().padStart(6, '0');

    return await itemOutRepository.createItemOut({
        data: body,
        code,
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

export const softDeletedItemOut = async ({
    itemOutId
}: {
    itemOutId: number
}) => {
    const item = await itemOutRepository.getItemOutById({
        itemOutId
    })

    if (!item) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Id barang keluar tidak ditemukan')
    }

    await itemOutRepository.softDeletedItemOut({
        itemOutId
    })

    await itemRepository.stockItemRestock({
        itemId: item.itemId,
        stock: item.amount
    })
    return { message: 'Data berhasil dihapus' }
}