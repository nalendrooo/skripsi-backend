import { Router } from "express";
import { loginOperator } from "./operator.controller";
// import { getAllCategory } from '../category/category.controller'

const route = Router()

route.post('/', loginOperator)

export default route    