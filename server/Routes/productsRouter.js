import express from "express";
import { createProduct } from "../controllers/productController.js";

const productsRouter = express.Router()

//create product
productsRouter.route("/product/new").post(createProduct);


export default productsRouter;