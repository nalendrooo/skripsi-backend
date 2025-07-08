import { Router } from "express";
import { createUser, getAllUser, getTopUser, updateUser } from "../admin.controller";
import { validateRequest } from "../../../middleware/validate-request";
import { createUserSchema } from "../../users/users.request";

const adminUnitRouter = Router();

adminUnitRouter.get('/', getAllUser);
adminUnitRouter.get('/top', getTopUser);
adminUnitRouter.post('/', validateRequest(createUserSchema), createUser);
adminUnitRouter.put('/:userId', validateRequest(createUserSchema), updateUser);

export default adminUnitRouter

