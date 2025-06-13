import express, { urlencoded } from "express";
import userregister from "./routes/userregister.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
dotenv.config()
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
{
    origin:"http://localhost:5173",
    credentials:true,
}
));
app.use(cookieParser());
app.use("/user",userregister);
app.use("/auth",auth);
export default app;