import { Router } from "express";
import { Product } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.get("/get-products", Product)

export default ProductRoutes;