
import express from "express";
import { 
  createProductRam, 
  getAllProductRam, 
  getSingleProductRam,
  deleteProductRam,
  updateProductRam 
} from "../controllers/productRamController.js";



// init router from express  
const router = express.Router(); 

// routes 
router.post("/", createProductRam); // create product ram
router.get("/", getAllProductRam);        // get all product ram
router.get("/:id", getSingleProductRam);  // get single product ram
router.delete("/:id", deleteProductRam);  // delete product ram
router.patch("/:id", updateProductRam);   // update product ram


// export default router 
export default router;
















