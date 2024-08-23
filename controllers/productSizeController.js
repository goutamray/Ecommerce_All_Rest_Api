
import asyncHandler from "express-async-handler";
import ProductSize from "../models/ProductSize.js";

/**
 * @DESC  GET ALL PRODUCT SIZE
 * @METHOD GET
 * @ROUTE /api/v1/productSize
 * @ACCESS PUBLIC 
 * 
 */
export const getAllProductSize = asyncHandler(async(req, res) => {
    // get all size
    const productSizeList = await ProductSize.find();

    // check size 
    if (!productSizeList) {
      return res.status(404).json({ productSizeList : "", message : "Product Size Not Found" });
    }

  // response 
  return res.status(200).json({ productSizeList,  message : "Get All Product Size"});
});


/**
 * @DESC GET SINGLE PRODUCT SIZE
 * @METHOD GET
 * @ROUTE /api/v1/productSize/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleProductSize = asyncHandler(async(req, res) => {
   // get params 
  const { id } = req.params;

  // find single Product size
  const productSize = await ProductSize.findById(id); 

  if (!productSize) {
     return  res.status(404).json({ message : "Single Product Size Not Found"});
  }

  // response 
  return res.status(200).json({ productSize , message : "Get Single Product Size"})
});


/**
 * @DESC CREATE PRODUCT SIZE
 * @METHOD POST
 * @ROUTE /api/v1/productSize
 * @ACCESS PUBLIC 
 * 
 */
export const createProductSize = asyncHandler(async(req, res) => {
  // get form data 
  const { name } = req.body;

  if (!name) {
     res.status(400).json({ message : "All fields are Required" })
  };

  // create new Product size 
  const productSize = await ProductSize.create({ name });

  // save data 
  return res.status(201).json({ productSize , message : "Product Size Created Successfull"})
});


/**
 * @DESC DELETE PRODUCT SIZE
 * @METHOD DETETE
 * @ROUTE /api/v1/productSize/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteProductSize = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

  // delete Product size  
  const productSize = await ProductSize.findByIdAndDelete(id);
  
  // check size 
  if (!productSize) {
    return res.status(404).json({ message : "Product Size not found" })
  }

  // send response 
  return res.status(200).json({ productSize,  message : "Product Size Deleted Successfull"})
});


/**
 * @DESC UPDATE PRODUCT SIZE 
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/productSize/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const updateProductSize = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

   // get form data 
   const { name } = req.body;

  
 // update Product size
  const productSize = await ProductSize.findByIdAndUpdate(
    id, 
    { name }, 
    {new : true});

   
   return res.status(200).json({productSize,  message : "Product Size Updated Successfull"})
});  












































