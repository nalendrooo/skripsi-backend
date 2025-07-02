import { ADMIN_ROLE } from "@prisma/client"
import { AppError } from "../../middleware/error-handler"
import { ERROR_CODE, IQueryParams } from "../../interface"
import * as itemRepository from "../item/item.repository"
import * as itemBalanceRepository from "./item-balance.repository"
import { IBodyCreateItemBalanceModel } from "../item-balance/item-balance.model"
import { metaPagination } from "../../utils/meta-pagination"
import { mapperItemBalance } from "./item-balance.mapper"

export const createItemBalance = async ({
    body,
    token
}: {
    body: IBodyCreateItemBalanceModel,
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
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Barang tidak ditemukan')
    }

    if (cekItem.stock < body.amount) {
        return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Stock tidak mencukupi')
    }

    const balance = cekItem.stock - body.amount

    const reduction = await itemRepository.stockItemReduction({
        itemId: itemId,
        stock: balance
    })

    const last = await itemBalanceRepository.getLastDataItemBalance()
    let nextNumber = 1;

    if (last && last.code) {
        const match = last.code.match(/OPN-(\d+)/);
        if (match && match[1]) {
            nextNumber = parseInt(match[1], 10) + 1;
        }
    }

    const code = 'OPN-' + nextNumber.toString().padStart(6, '0');

    return await itemBalanceRepository.createItemBalance({
        data: { ...body, amount: balance },
        finalStock: body.amount,
        initialStock: cekItem.stock,
        code,
        adminId: token.id
    })
}

export const getAllItemBalance = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemBalanceRepository.getAllItemBalance({
        query
    })

    const count = await itemBalanceRepository.getCountAllItemBalance({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItemBalance(data), meta }
}
