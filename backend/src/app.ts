import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import { cookie } from 'express-validator';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config();
const app = express();

//middlewares

//cors
app.use(cors({origin:"http://127.0.0.1:5173", credentials:true}));

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
//body parser
app.use(express.json());
//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove in production
app.use(morgan('dev'));

app.use('/api/v1', appRouter);

export default app;