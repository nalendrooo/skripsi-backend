import { Router } from "express";

import categoryRouter from "./router/category";
import divisionRouter from "./router/division";
import unitRouter from "./router/unit";
import itemRouter from "./router/item";
import itemOutRouter from "./router/item-out";
import itemBalanceRouter from "./router/item-balance";
import itemRestockRouter from "./router/item-restock";
import userRouter from "./router/user";
import operatorRouter from "./router/operator";

const route = Router()

route.use('/category', categoryRouter)
route.use('/division', divisionRouter)
route.use('/unit', unitRouter)
route.use('/item', itemRouter)
route.use('/item-out', itemOutRouter)
route.use('/item-balance', itemBalanceRouter)
route.use('/item-restock', itemRestockRouter)
route.use('/user', userRouter)
route.use('/operator', operatorRouter)

export default route    