import express from "express";
import adminRoute from '../app/admin/admin.route'
import userRoute from '../app/users/users.routes'
import operatorRoute from '../app/operator/operator.route'
// import { getAllMaterialContentType } from "../app/material-content-type/material-content-type.controller";
import { verifyToken } from "../middleware/verify-token";
import { Router } from "express";
// import erklikaRoute from '../app/erklika/erklika.route'
// import categoryRoute from '../app/category/category.route'
// import exploreRoute from '../app/explore/explore.route'
// import courseRoute from '../app/course/course.route'

export const publicRouter = Router();


publicRouter.get('/', (req, res) => {
    res.json('Hello World Nalendro!');
});
publicRouter.get('/users', (req, res) => {
    res.json('Hello users!');
});
publicRouter.use('/admin', verifyToken, adminRoute);
publicRouter.use('/operator', operatorRoute);
publicRouter.use('/user', userRoute);
// publicRouter.use('/material', getAllMaterialContentType);
// publicRouter.use('/access', erklikaRoute);
// publicRouter.use('/category', categoryRoute);
// publicRouter.use('/explore', exploreRoute);
// publicRouter.use('/course', courseRoute);