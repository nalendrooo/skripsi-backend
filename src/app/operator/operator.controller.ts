// import { NextFunction, Request, Response } from "express"
import { AppError } from '../../middleware/error-handler'
import { ResponseHandler } from '../../utils/response-handler'
import * as operatorService from '../operator/operator.service'
// import { AppError } from "../../middleware/error-handler"
// import { ResponseHandler } from "../../utils/response-handler"

import { NextFunction, Request, Response } from "express"

// export const getAllCategory = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     const { query } = req
//     const data = await categoryService.getAllCategory({
//         query
//     })

//     if (data instanceof AppError) {
//         next(data)
//         return
//     }

//     ResponseHandler.ok(res, data, `Data berhasil di ambil`)
// }

export const loginOperator = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { body } = req

    const data = await operatorService.loginOperator({
        body
    })

    if (data instanceof AppError) {
        next(data)
        return
    }

    ResponseHandler.ok(res, data, `Data berhasil dibuat`)
}