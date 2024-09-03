
import express from "express";
import { 
  createOrder, 
  deleteOrder, 
  getAllOrder,
  updateOrder,
} from "../controllers/orderController.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/create", createOrder);   
router.get("/", getAllOrder);       
router.delete("/:id", deleteOrder);  
router.patch("/:id", updateOrder);  


// export default router 
export default router;






