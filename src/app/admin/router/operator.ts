import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createAdminSchema } from "../../operator/operator.request";
import { createOperator } from "../admin.controller";

const adminOperator = Router();

adminOperator.post('/', validateRequest(createAdminSchema), createOperator);
// adminOperator.post('/login', validateRequest(loginAdminSchema), loginOperator);

export default adminOperator

