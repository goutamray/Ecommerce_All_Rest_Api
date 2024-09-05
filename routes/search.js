

import express from "express";
import { getAllSearchProduct } from "../controllers/searchController.js";



// init router from express  
const router = express.Router(); 

// routes 
router.get("/", getAllSearchProduct);     



// export default router 
export default router;

















