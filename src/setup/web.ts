import express from "express";
import { publicRouter } from "../routes/route";
import { errorHandler } from "../middleware/error-handler";
import cors from 'cors'
export const web = express()

const allowedOrigins = [
  'http://localhost:5001',
  'http://34.126.178.89:5001',
  'https://frontend-203493376264.asia-southeast1.run.app',
];

// Middleware CORS dengan origin dinamis
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // izinkan
    } else {
      callback(new Error("Not allowed by CORS")); // tolak
    }
  },
  credentials: true,
};

// Terapkan CORS
web.use(cors(corsOptions));

// Handle preflight OPTIONS untuk semua route
web.options("*", cors(corsOptions));

web.use(express.json())
web.use('/api', publicRouter)
web.use(errorHandler)