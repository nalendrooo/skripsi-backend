import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemSchema } from "../../item/item.request";
import { createItem, getAllItem } from "../admin.controller";

const adminItemRouter = Router();

adminItemRouter.get('/', getAllItem);
adminItemRouter.post('/', validateRequest(createItemSchema), createItem);
// adminItemRouter.patch('/:unitId', validateRequest(createUnitSchema), updateUnit);

export default adminItemRouter

