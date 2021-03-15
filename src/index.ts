import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { Pool } from 'pg';
import authRoutes from './routes/auth';

config({ path: __dirname + '/../.env' });

const dbConfig = new Pool({
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
})

const server = express();

//middlewares
server.use(express.json());
server.use(cors());
server.use(helmet());

//routes
server.use('/api/auth', authRoutes);

server.listen(process.env.PORT, () => `http://localhost:${process.env.PORT}`);

export default dbConfig;