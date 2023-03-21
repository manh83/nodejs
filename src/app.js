import express from "express";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import ProductRouter from "./router/products"

const app = express()
app.use(express.json())
app.use("/api",ProductRouter)

mongoose.connect("mongodb://127.0.0.1:27017/assignment1")
export const viteNodeApp = app