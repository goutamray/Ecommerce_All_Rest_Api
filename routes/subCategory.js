

import express from "express";
import { 
  createSubCategory, 
  getAllSubCategory,
  getSingleSubCategory,
  deleteSubCategory, 
  updateSubCategory 
} from "../controllers/subCategoryController.js";
import { subCategoryPhotoMulter } from "../utilis/multer.js";


// init router from express  
const router = express.Router(); 

// routes 
router.post("/", subCategoryPhotoMulter, createSubCategory); // create category
router.get("/", getAllSubCategory);        // get all category 
router.get("/:id", getSingleSubCategory);  // get single category
router.delete("/:id", deleteSubCategory);  // delete category 
router.patch("/:id", subCategoryPhotoMulter, updateSubCategory);   // update category 


// export default router 
export default router;












