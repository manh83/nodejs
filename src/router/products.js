import express  from "express";
import {appProducts, getAllProduct, getOneProduct, remove, update} from "../controller/products"

const router = express.Router()
    router.post("/products/add",appProducts)
    router.get("/products",getAllProduct)
    router.get("/products/:id",getOneProduct)
    router.delete("/products/:id",remove)
    router.patch("/products/:id",update)
export default router