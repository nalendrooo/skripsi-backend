import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemBalanceSchema } from "../../item-balance/item-balance.request";
import { createItemBalance, getAllItemBalance } from "../admin.controller";

const adminItemRouter = Router();

adminItemRouter.get('/', getAllItemBalance);
adminItemRouter.post('/', validateRequest(createItemBalanceSchema), createItemBalance);
// adminItemRouter.patch('/:unitId', validateRequest(createUnitSchema), updateUnit);

export default adminItemRouter

