

import express from "express";
import { 
  getAllWishList,
  createWishList, 
  deleteWishList, 
} from "../controllers/wishListController.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/", createWishList);  
router.get("/", getAllWishList);       
router.delete("/:id", deleteWishList);  


// export default router 
export default router;
















