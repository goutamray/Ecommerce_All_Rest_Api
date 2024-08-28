
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
router.post("/", subCategoryPhotoMulter, createSubCategory); // create sub category
router.get("/", getAllSubCategory);        // get all sub category 
router.get("/:id", getSingleSubCategory);  // get single sub category
router.delete("/:id", deleteSubCategory);  // delete sub category 
router.patch("/:id", subCategoryPhotoMulter, updateSubCategory);   // update sub category 


// export default router 
export default router;












