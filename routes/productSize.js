
import express from "express";
import { 
  createProductSize, 
  getAllProductSize, 
  getSingleProductSize,
  deleteProductSize,
  updateProductSize 
} from "../controllers/productSizeController.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/", createProductSize); // create product size
router.get("/", getAllProductSize);        // get all product size
router.get("/:id", getSingleProductSize);  // get single product size
router.delete("/:id", deleteProductSize);  // delete product size
router.patch("/:id", updateProductSize);   // update product size


// export default router 
export default router;












