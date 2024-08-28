
import express from "express";
import { 
  createProduct, 
  deleteProduct, 
  getAllProducts, 
  getRelatedProducts,
  getSingleProduct, 
  updateProduct 
} from "../controllers/productController.js";
import { productPhotoMulter } from "../utilis/multer.js";


// init router from express  
const router = express.Router(); 

// routes 
router.get("/", getAllProducts ); // get products
router.get("/related-product", getRelatedProducts ); // get products
router.get("/:id", getSingleProduct ); // get single product
router.post("/create", productPhotoMulter, createProduct ); // create product
router.delete("/:id", deleteProduct ); // delete product
router.patch("/:id", productPhotoMulter, updateProduct ); // update product


// export default router 
export default router;



