import express from "express";
import { publicRouter } from "../routes/route";
import { errorHandler } from "../middleware/error-handler";
import cors from 'cors'
export const web = express()

web.use(cors({ origin: ['http://localhost:5001'], credentials: true }))
web.use(express.json())
web.use('/api', publicRouter)
web.use(errorHandler)