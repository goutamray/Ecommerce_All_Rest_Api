
import express from "express";
import { 
  createCategory, 
  deleteCategory, 
  getAllCategory,
  getSingleCategory,
  updateCategory 
} from "../controllers/categoryController.js";
 import { categoryPhotoMulter } from "../utilis/multer.js";


// init router from express  
const router = express.Router(); 

// routes 
router.post("/", categoryPhotoMulter, createCategory); // create category
router.get("/", getAllCategory);        // get all category 
router.get("/:id", getSingleCategory);  // get single category
router.delete("/:id", deleteCategory);  // delete category 
router.patch("/:id", categoryPhotoMulter, updateCategory);   // update category 


// export default router 
export default router;




