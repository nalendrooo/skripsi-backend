import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemOutSchema } from "../../item-out/item-out.request";
import { createItemOut, getAllItemOut } from "../admin.controller";

const adminItemRouter = Router();

adminItemRouter.get('/', getAllItemOut);
adminItemRouter.post('/', validateRequest(createItemOutSchema), createItemOut);
// adminItemRouter.patch('/:unitId', validateRequest(createUnitSchema), updateUnit);

export default adminItemRouter

