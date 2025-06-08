import { Router } from "express";
import { createUser, getAllUser } from "../admin.controller";
import { validateRequest } from "../../../middleware/validate-request";
import { createUserSchema } from "../../users/users.request";

const adminUnitRouter = Router();

adminUnitRouter.get('/', getAllUser);
adminUnitRouter.post('/', validateRequest(createUserSchema), createUser);

export default adminUnitRouter

