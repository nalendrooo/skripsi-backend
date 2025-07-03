import { Router } from "express";
import { loginOperator, getAllOperator, logoutOperator } from "./operator.controller";
import { verifyToken } from "../../middleware/verify-token";
// import { getAllCategory } from '../category/category.controller'

const route = Router()

// route.get('/', getAllOperator)
route.post('/login', loginOperator)
route.delete('/logout', logoutOperator)

export default route    