
import express from "express";
import { 
  createSlider, 
  deleteSlider, 
  getAllSlider,
  getSingleSlider,
  updateSlider,
} from "../controllers/sliderController.js";
import { sliderPhotoMulter } from "../utilis/multer.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/", sliderPhotoMulter, createSlider);  
router.get("/", getAllSlider);             
router.get("/:id", getSingleSlider);             
router.delete("/:id", deleteSlider);  
router.patch("/:id", sliderPhotoMulter, updateSlider);  

// export default router 
export default router;














