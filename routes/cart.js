
import express from "express";
import { 
  createCart, 
  deleteCart, 
  getAllCart,
  updateCart,
} from "../controllers/cartController.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/add", createCart);    // create cart
router.get("/", getAllCart);        // get all cart    // cart count
router.delete("/:id", deleteCart);  // delete cart
router.patch("/:id", updateCart);  // update cart 


// export default router 
export default router;
