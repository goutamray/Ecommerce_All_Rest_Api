
import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";

import { 
        fileDeleteFromCloud, 
        fileUploadToCloud 
      } from "../utilis/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @DESC  GET ALL BRAND
 * @METHOD GET
 * @ROUTE /api/v1/brand
 * @ACCESS PUBLIC 
 * 
 */
export const getAllBrand = asyncHandler(async(req, res) => {
    // get all brand
    const brandList = await Brand.find();

    // check brand 
    if (!brandList) {
      return res.status(404).json({ brandList : "", message : "Brand Not Found" });
    }

  // response 
  return res.status(200).json({ brandList,  message : "Get All Brand"});
});


/**
 * @DESC GET SINGLE BRAND
 * @METHOD GET
 * @ROUTE /api/v1/brand/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleBrand = asyncHandler(async(req, res) => {
   // get params 
  const { id } = req.params;

  // find single brand
  const brand = await Brand.findById(id); 

  if (!brand) {
     return  res.status(404).json({ message : "Single Brand Data Not Found"});
  }

  // response 
  return res.status(200).json({ brand , message : "Get Single Brand"})
})


/**
 * @DESC CREATE BRAND
 * @METHOD POST
 * @ROUTE /api/v1/brand
 * @ACCESS PUBLIC 
 * 
 */
export const createBrand = asyncHandler(async(req, res) => {
  // get form data 
  const { name } = req.body;

  if (!name) {
     res.status(400).json({ message : "All fields are Required" })
  };

   // photo manage 
   let filedata = null;

   if(req.file){
    const data = await fileUploadToCloud(req.file.path)
    filedata = data.secure_url;
   }; 

     // create new brand 
     const brand = await Brand.create({ name, photo : filedata  });

    // save data 
    return res.status(201).json({ brand , message : "Brand Created Successfull"})
})


/**
 * @DESC DELETE BRAND
 * @METHOD DETETE
 * @ROUTE /api/v1/brand/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteBrand = asyncHandler(async(req, res) => {
     // get params 
     const { id } = req.params;

     // delete brand data 
     const brand = await Brand.findByIdAndDelete(id);
  
     // check brand 
     if (!brand) {
       return res.status(404).json({ message : "Brand not found" })
     }

     // delete cloud file
      await fileDeleteFromCloud(findPublicId(brand.photo)); 

    // send response 
    return res.status(200).json({ brand,  message : "Brand Deleted Successfull"})
})


/**
 * @DESC UPDATE BRAND
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/brand/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const updateBrand = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

   // get form data 
   const { name } = req.body;

   // Fetch the existing brand to get the current photo URL
   const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }; 

    // Photo management
    let filedata = existingBrand.photo; // Keep old photo URL by default

    if (req.file) {
      const data = await fileUploadToCloud(req.file.path);
      filedata = data.secure_url; // Update with new photo URL
    };
  
   // update brand
   const brandUpdate = await Brand.findByIdAndUpdate(
    id, 
    { name, photo : filedata }, 
    {new : true});

   return res.status(200).json({brandUpdate,  message : "Brand Updated Successfull"}); 
});  


















