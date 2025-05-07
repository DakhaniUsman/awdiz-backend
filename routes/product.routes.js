import { Router } from "express";
import { AddProduct, Product } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.get("/get-products", Product)
ProductRoutes.get("/add-product", AddProduct)

export default ProductRoutes;