// import { NextFunction, Request, Response } from "express"
import { AppError } from '../../middleware/error-handler'
import { ResponseHandler } from '../../utils/response-handler'
import * as operatorService from '../operator/operator.service'
// import { AppError } from "../../middleware/error-handler"
// import { ResponseHandler } from "../../utils/response-handler"

import { NextFunction, Request, Response } from "express"

export const getAllOperator = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { query } = req
    const data = await operatorService.getAllOperator({
        query
    })

    if (data instanceof AppError) {
        next(data)
        return
    }

    ResponseHandler.ok(res, data, `Data berhasil di ambil`)
}

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

    return res
        .status(200)
        .cookie("token", data.token, { maxAge: 60 * 60 * 1000, httpOnly: false })
        .json({ status: 'success', message: 'Anda berhasil login', data, })
}