import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemSchema } from "../../item/item.request";
import { createItem, getAllItem, getDownloadListItem, updateItem } from "../admin.controller";

const adminItemRouter = Router();

adminItemRouter.get('/', getAllItem);
// adminItemRouter.get('/download-excel', getDownloadListItem);
adminItemRouter.post('/', validateRequest(createItemSchema), createItem);
adminItemRouter.put('/:itemId', validateRequest(createItemSchema), updateItem);

export default adminItemRouter

