import { Router } from "express";
import { AddProduct, getProduct, AddedProduct , SingleProduct } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.get("/get-all-products", getProduct)
ProductRoutes.post("/add-product", AddProduct)
ProductRoutes.post("/get-added-products", AddedProduct)
ProductRoutes.post("/get-single-product", SingleProduct)

export default ProductRoutes;