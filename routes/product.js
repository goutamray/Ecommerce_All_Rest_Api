
import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { productPhotoMulter } from "../utilis/multer.js";



// init router from express  
const router = express.Router(); 


// routes 
router.get("/", getAllProducts ); // get products
router.get("/:id", getSingleProduct ); // get single product
router.post("/", productPhotoMulter, createProduct ); // create product
router.delete("/:id", deleteProduct ); // delete product
router.patch("/:id", productPhotoMulter, updateProduct ); // update product


// export defult router 
export default router;


