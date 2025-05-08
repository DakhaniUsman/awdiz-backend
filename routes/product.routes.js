import { Router } from "express";
import { AddProduct, getProduct, AddedProduct } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.get("/get-all-products", getProduct)
ProductRoutes.post("/add-product", AddProduct)
ProductRoutes.post("/get-added-products", AddedProduct)

export default ProductRoutes;