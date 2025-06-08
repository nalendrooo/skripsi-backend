// import { NextFunction, Request, Response } from "express"
// import * as categoryService from '../category/category.service'
// import { AppError } from "../../middleware/error-handler"
// import { ResponseHandler } from "../../utils/response-handler"

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