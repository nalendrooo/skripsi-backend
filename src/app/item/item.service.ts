import * as itemRepository from "./item.repository";

import { ERROR_CODE, IQueryParams } from "../../interface"
import { metaPagination } from "../../utils/meta-pagination";
import { AppError } from "../../middleware/error-handler";
import { IBodyCreateItemModel } from "./item.model";
import { mapperItem } from "./item.mapper";

// export const updateUnit = async ({
//     body,
//     params: { unitId }
// }: {
//     body: IBodyCreateUnitModel,
//     params: { unitId?: string }

// }) => {

//     const cekDivision = await itemRepository.getUnitById({
//         unitId: Number(unitId)
//     })

//     if (!cekDivision) {
//         return new AppError(ERROR_CODE.NOT_FOUND.code, 'Division tidak ditemukan')
//     }

//     return await itemRepository.updateUnitById({
//         unitId: Number(unitId),
//         data: body,
//     })
// }

export const createItem = async ({
    body,
}: {
    body: IBodyCreateItemModel,
}) => {
    return await itemRepository.createItem({
        data: body,
    })
}
export const updateItem = async ({
    body,
    itemId
}: {
    body: IBodyCreateItemModel,
    itemId: number
}) => {

    const cekItem = await itemRepository.getItemById({ itemId })

    if (!cekItem) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Item tidak ditemukan')
    }

    return await itemRepository.updateItem({
        itemId,
        data: body,
    })
}

export const getAllItem = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemRepository.getAllItem({
        query
    })

    const count = await itemRepository.getCountAllItem({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItem(data), meta }
}
