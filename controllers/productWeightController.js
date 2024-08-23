
import asyncHandler from "express-async-handler";
import ProductWeight from "../models/ProductWeight.js";

/**
 * @DESC  GET ALL PRODUCT WEIGHT
 * @METHOD GET
 * @ROUTE /api/v1/productWeight
 * @ACCESS PUBLIC 
 * 
 */
export const getAllProductWeight = asyncHandler(async(req, res) => {
    // get all Weight
    const productWeightList = await ProductWeight.find();

    // check Weight 
    if (!productWeightList) {
      return res.status(404).json({ productSizeList : "", message : "Product Weight Not Found" });
    }

  // response 
  return res.status(200).json({ productWeightList,  message : "Get All Product Weight"});
});


/**
 * @DESC GET SINGLE PRODUCT WEIGHT
 * @METHOD GET
 * @ROUTE /api/v1/productWeight/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleProductWeight = asyncHandler(async(req, res) => {
   // get params 
  const { id } = req.params;

  // find single Product Weight
  const productWeight = await ProductWeight.findById(id); 

  if (!productWeight) {
     return res.status(404).json({ message : "Single Product Weight Not Found"});
  };

  // response 
  return res.status(200).json({ productWeight , message : "Get Single Product Weight"})
}); 


/**
 * @DESC CREATE PRODUCT WEIGHT
 * @METHOD POST
 * @ROUTE /api/v1/productWeight
 * @ACCESS PUBLIC 
 * 
 */
export const createProductWeight = asyncHandler(async(req, res) => {
  // get form data 
  const { name } = req.body;

  if (!name) {
     res.status(400).json({ message : "All fields are Required" })
  };

  // create new Product Weight 
  const productWeight = await ProductWeight.create({ name });

  // save data 
  return res.status(201).json({ productWeight , message : "Product Weight Created Successfull"})
}); 


/**
 * @DESC DELETE PRODUCT WEIGHT
 * @METHOD DETETE
 * @ROUTE /api/v1/productWeight/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteProductWeight = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

  // delete Product Weight  
  const productWeight = await ProductWeight.findByIdAndDelete(id);
  
  // check Weight 
  if (!productWeight) {
    return res.status(404).json({ message : "Product Weight not found" })
  }

  // send response 
  return res.status(200).json({ productWeight,  message : "Product Weight Deleted Successfull"})
});


/**
 * @DESC UPDATE PRODUCT WEIGHT 
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/productWeight/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const updateProductWeight = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

  // get form data 
  const { name } = req.body;

 // update Product Weight
  const productWeight = await ProductWeight.findByIdAndUpdate(
    id, 
    { name }, 
    {new : true});

   return res.status(200).json({productWeight,  message : "Product Weight Updated Successfull"})
});  




























































