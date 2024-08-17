
import asyncHandler from "express-async-handler";

import { findPublicId } from "../helpers/helpers.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { fileDeleteFromCloud, fileUploadToCloud } from "../utilis/cloudinary.js";

 
/**
 * @DESC GET ALL PRODUCT 
 * @METHOD GET
 * @ROUTE /api/v1/product
 * @ACCESS PUBLIC 
 * 
 */
export const getAllProducts =  asyncHandler(async(req, res) => {
      // get all product 
      const productList = await Product.find().populate("category");

      // check product 
      if (productList.length === 0 ) {
        return res.status(404).json({ 
          productList : "", 
          message : "Products Not Found" });
      }; 
  
    return res.status(200).json({ productList,  message : "Get All Products"});
}); 

/**
 * @DESC GET SINGLE PRODUCT 
 * @METHOD GET
 * @ROUTE /api/v1/product/:id
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleProduct = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

  // find single product
  const product = await Product.findById(id); 

  if (!product) {
     return  res.status(404).json({ message : "Single Product Data Not Found"});
  }

  return res.status(200).json({ product , message : "Get Single Product"})
}); 


/**
 * @DESC CREATE PRODUCT 
 * @METHOD POST 
 * @ROUTE /api/v1/product
 * @ACCESS PUBLIC 
 * 
 */
export const createProduct = asyncHandler(async(req, res) => {
  const categoryData = await Category.findById(req.body.category);

  // check category  
  if (!categoryData) {
   return res.status(404).json({ message : "Category Not Found"});
  }; 

  const { name,
          description,
          brand,
          price,
          oldPrice,
          category,
          countInStock, 
          rating, 
          isFeatured,
          } = req.body; 

       

    // validation
  if (!name || !description || !price) {
    return res.status(400).json({ message : "All fields are Required" })
  };

    // Handle multiple file uploads
    let filedata = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const data = await fileUploadToCloud(file.path);
        filedata.push(data.secure_url);
      }
    }

  // create product 
  const newProduct = await Product.create({ 
    name, 
    description, 
    brand, 
    price, 
    oldPrice,
    category, 
    countInStock, 
    rating, 
    isFeatured, 
    photo : filedata  
  });


   return res.status(201).json({ newProduct,  message : "Product created Successfull"});
   
}); 



/**
 * @DESC DELETE PRODUCT 
 * @METHOD DELETE
 * @ROUTE /api/v1/product/:id
 * @ACCESS PUBLIC 
 * 
 */
export const deleteProduct = asyncHandler(async(req, res) => {
     // get params 
     const { id } = req.params;

     // delete product data 
     const product = await Product.findByIdAndDelete(id);
  
     // check product
     if (!product) {
       return res.status(404).json({ message : "Product not found" })
     }

     // delete cloud file
     const photoUrl = product.photo;

     await fileDeleteFromCloud(findPublicId(photoUrl));

  return res.status(200).json({ product,  message : "Product Deleted Successfully"})
});  

 
/**
 * @DESC UPDATE PRODUCT 
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/product/:id
 * @ACCESS PUBLIC 
 * 
 */
export const updateProduct = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

   // get form data 
   const { 
    name,
    description,
    brand,
    price,
    oldPrice,
    category,
    countInStock, 
    rating, 
    isFeatured  } = req.body; 


    // Handle multiple file uploads
    let filedata = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const data = await fileUploadToCloud(file.path);
        filedata.push(data.secure_url);
      }
    } 

 // update product
  const productUpdate = await Product.findByIdAndUpdate(
    id, 
    { name,    
      description,
      brand,
      price,
      oldPrice,
      category,
      countInStock, 
      rating, 
      isFeatured , 
      photo : filedata 
    }, 
    {new : true});

   
   return res.status(200).json({productUpdate,  message : "Product Updated Successfull"})
});  



