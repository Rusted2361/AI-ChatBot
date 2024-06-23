import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import { cookie } from 'express-validator';
import cookieParser from 'cookie-parser';
config();
const app = express();

//middlewares
app.use(express.json());
//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove in production
app.use(morgan('dev'));

app.use('/api/v1', appRouter);

export default app;