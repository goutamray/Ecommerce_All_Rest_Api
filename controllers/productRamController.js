
import asyncHandler from "express-async-handler";
import ProductRam from "../models/ProductRam.js";

/**
 * @DESC  GET ALL PRODUCT RAM
 * @METHOD GET
 * @ROUTE /api/v1/productRam
 * @ACCESS PUBLIC 
 * 
 */
export const getAllProductRam = asyncHandler(async(req, res) => {
    // get all brand
    const productRamList = await ProductRam.find();

    // check brand 
    if (!productRamList) {
      return res.status(404).json({ productRamList : "", message : "Product Ram Not Found" });
    }

  // response 
  return res.status(200).json({ productRamList,  message : "Get All Product Ram"});
});


/**
 * @DESC GET SINGLE PRODUCT RAM
 * @METHOD GET
 * @ROUTE /api/v1/productRam/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleProductRam = asyncHandler(async(req, res) => {
   // get params 
  const { id } = req.params;

  // find single Product Ram
  const productRam = await ProductRam.findById(id); 

  if (!productRam) {
     return  res.status(404).json({ message : "Single Product Ram Not Found"});
  }

  // response 
  return res.status(200).json({ productRam , message : "Get Single Product Ram"})
});


/**
 * @DESC CREATE PRODUCT RAM
 * @METHOD POST
 * @ROUTE /api/v1/productRam
 * @ACCESS PUBLIC 
 * 
 */
export const createProductRam = asyncHandler(async(req, res) => {
  // get form data 
  const { name } = req.body;

  if (!name) {
     res.status(400).json({ message : "All fields are Required" })
  };

  // create new Product Ram 
  const productRam = await ProductRam.create({ name });

  // save data 
  return res.status(201).json({ productRam , message : "Product Ram Created Successfull"})
});


/**
 * @DESC DELETE PRODUCT RAM
 * @METHOD DETETE
 * @ROUTE /api/v1/productRam/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteProductRam = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

  // delete Product Ram  
  const productRam = await ProductRam.findByIdAndDelete(id);
  
  // check brand 
  if (!productRam) {
    return res.status(404).json({ message : "Product Ram not found" })
  }

  // send response 
  return res.status(200).json({ productRam,  message : "Product Ram Deleted Successfull"})
});


/**
 * @DESC UPDATE PRODUCT RAM 
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/productRam/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const updateProductRam = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

   // get form data 
   const { name } = req.body;

  
 // update Product Ram
  const productRam = await ProductRam.findByIdAndUpdate(
    id, 
    { name }, 
    {new : true});

   
   return res.status(200).json({productRam,  message : "Product Ram Updated Successfull"})
});  































