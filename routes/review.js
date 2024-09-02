
import express from "express";
import { 
  addReview, 
  deleteReview, 
  getAllReviews,
  getSingleReview,
  updateReview,
} from "../controllers/productReviewController.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/", addReview);  
router.get("/", getAllReviews);       
router.get("/:id", getSingleReview);          
router.delete("/:id", deleteReview);  
router.patch("/:id", updateReview);  

// export default router 
export default router;














