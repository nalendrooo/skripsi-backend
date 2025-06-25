import { Router } from "express";
import { loginOperator, getAllOperator } from "./operator.controller";
import { verifyToken } from "../../middleware/verify-token";
// import { getAllCategory } from '../category/category.controller'

const route = Router()

// route.get('/', getAllOperator)
route.post('/login', loginOperator)

export default route    