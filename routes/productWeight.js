
import express from "express";
import { 
  createProductWeight, 
  getAllProductWeight, 
  getSingleProductWeight,
  deleteProductWeight,
  updateProductWeight 
} from "../controllers/productWeightController.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/", createProductWeight); // create product weight
router.get("/", getAllProductWeight);        // get all product weight
router.get("/:id", getSingleProductWeight);  // get single product weight
router.delete("/:id", deleteProductWeight);  // delete product weight
router.patch("/:id", updateProductWeight);   // update product weight


// export default router 
export default router;



