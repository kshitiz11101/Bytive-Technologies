import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import dbconnection from './db/dbconnection.js';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
const app=express();
dotenv.config();

const PORT = process.env.PORT || 8800;
app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(router);
app.use(errorMiddleware);
dbconnection();
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})