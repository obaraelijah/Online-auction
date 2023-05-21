import express from "express";
import { 
    createProduct,
    getAllProducts, 
    updateProduct,
    deleteProduct,
    getProductDetails,
    getMyProducts 
} from "../controllers/productController.js";

const productsRouter = express.Router()

//create product
productsRouter.route("/product/new").post(createProduct);

// get all products 
productsRouter.route("/products").get(getAllProducts);

//get single product
productsRouter.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

//get my products
productsRouter.route("/products/myproducts").get(getMyProducts);


export default productsRouter;