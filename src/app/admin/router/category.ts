import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createCategory, getAllCategory, updateCategory } from "../admin.controller";
import { createCategorySchema } from "../../category/category.request";

const adminCategoryRouter = Router();

adminCategoryRouter.get('/', getAllCategory);
adminCategoryRouter.post('/', validateRequest(createCategorySchema), createCategory);
adminCategoryRouter.patch('/:categoryId', validateRequest(createCategorySchema), updateCategory);

export default adminCategoryRouter

