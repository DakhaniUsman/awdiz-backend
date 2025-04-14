import { Router } from "express";
import { CreateProduct, Product } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.get("/get-products", Product)
ProductRoutes.get("/create-product", CreateProduct)

export default ProductRoutes;