import { Router } from "express";
import { addToCart, getCart, updateCartItem, removeFromCart } from "../controllers/cart.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.put("/update", auth, updateCartItem);
router.delete("/remove", auth, removeFromCart);

export default router;
