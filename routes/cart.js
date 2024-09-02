
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
router.post("/add", createCart);   
router.get("/", getAllCart);       
router.delete("/:id", deleteCart);  
router.patch("/:id", updateCart);  


// export default router 
export default router;
