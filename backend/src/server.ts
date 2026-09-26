import morgan from 'morgan'
import express, { Express } from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { connection } from './config/connection'
import { corsOptions } from './config/cors'
import { IS_DEV } from './config/env'

import { errorHandler } from './middlewares/error'

import { startRandomSpanJob } from './jobs/randomSpan.job'

import productRouter from './routes/product.routes'
import authRouter from './routes/auth.routes'
import categoryRouter from './routes/category.routes'

connection();

startRandomSpanJob();

const server: Express = express();

server.use(cors(corsOptions))

server.use(express.json());
server.use(cookieParser());

// Servir assets estáticos
server.use('/files', express.static(path.join(__dirname, '../assets')));

if (IS_DEV) {
    server.use(morgan('dev'))
}

server.use("/api/products", productRouter);
server.use("/api/auth", authRouter);
server.use("/api/categories", categoryRouter);

server.use(errorHandler);

export default server
