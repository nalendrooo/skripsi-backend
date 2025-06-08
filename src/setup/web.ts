import express from "express";
import { publicRouter } from "../routes/route";
import { errorHandler } from "../middleware/error-handler";
import cors from 'cors'
export const web = express()

web.use(express.json())
web.use(cors({ origin: '*' }))
web.use('/api', publicRouter)
web.use(errorHandler)