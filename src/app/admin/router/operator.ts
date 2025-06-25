import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createAdminSchema } from "../../operator/operator.request";
import { createOperator } from "../admin.controller";
import { getAllOperator } from "../../operator/operator.controller";

const adminOperator = Router();

adminOperator.post('/', validateRequest(createAdminSchema), createOperator);
adminOperator.get('/', getAllOperator);
// adminOperator.post('/login', validateRequest(loginAdminSchema), loginOperator);

export default adminOperator

