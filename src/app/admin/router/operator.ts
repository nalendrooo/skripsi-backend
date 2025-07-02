import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createAdminSchema, updateAdminSchema } from "../../operator/operator.request";
import { createOperator, updateOperator } from "../admin.controller";
import { getAllOperator } from "../../operator/operator.controller";

const adminOperator = Router();

adminOperator.get('/', getAllOperator);
adminOperator.post('/', validateRequest(createAdminSchema), createOperator);
adminOperator.put('/:operatorId', validateRequest(updateAdminSchema), updateOperator);
// adminOperator.post('/login', validateRequest(loginAdminSchema), loginOperator);

export default adminOperator

