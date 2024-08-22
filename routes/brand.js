
import express from "express";
import { 
  createBrand, 
  getAllBrand, 
  getSingleBrand,
  deleteBrand,
  updateBrand 
} from "../controllers/brandController.js";
 import { brandPhotoMulter } from "../utilis/multer.js";


// init router from express  
const router = express.Router(); 

// routes 
router.post("/", brandPhotoMulter, createBrand); // create brand
router.get("/", getAllBrand);        // get all brand
router.get("/:id", getSingleBrand);  // get single brand
router.delete("/:id", deleteBrand);  // delete brand 
router.patch("/:id", brandPhotoMulter, updateBrand);   // update brand


// export default router 
export default router;












