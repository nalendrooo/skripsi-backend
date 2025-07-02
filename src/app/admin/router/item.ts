import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemSchema } from "../../item/item.request";
import { createItem, getAllItem, updateItem } from "../admin.controller";

const adminItemRouter = Router();

adminItemRouter.get('/', getAllItem);
adminItemRouter.post('/', validateRequest(createItemSchema), createItem);
adminItemRouter.put('/:itemId', validateRequest(createItemSchema), updateItem);

export default adminItemRouter

