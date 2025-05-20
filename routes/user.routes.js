import { Router } from "express";
import { addToCart, getCartProducts , removeCartProduct} from "../controllers/user.controllers.js";

const UserRoutes = Router();

UserRoutes.post("/add-to-cart", addToCart)
UserRoutes.post("/get-cart-products", getCartProducts);
UserRoutes.post("/remove-cart-product", removeCartProduct)

export default UserRoutes;