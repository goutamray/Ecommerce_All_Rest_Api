
import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import { 
        fileDeleteFromCloud, 
        fileUploadToCloud } from "../utilis/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @DESC  GET ALL CATEGORY
 * @METHOD GET
 * @ROUTE /api/v1/category
 * @ACCESS PUBLIC 
 * 
 */
 export const getAllCategory = asyncHandler(async(req, res) => {
    // get all categories 
    const categoryList = await Category.find().populate("subCat");

    // check category 
    if (!categoryList) {
      return res.status(404).json({ categoryList : "", message : "Categories Not Found" });
    }

  return res.status(200).json({ categoryList,  message : "Get All Category"});
});
 


/**
 * @DESC GET SINGLE CATEGORY
 * @METHOD GET
 * @ROUTE /api/v1/category/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleCategory = asyncHandler(async(req, res) => {
   // get params 
  const { id } = req.params;

  // find single category
  const category = await Category.findById(id); 

  if (!category) {
     return res.status(404).json({ message : "Single Category Data Not Found"});
  }

  return res.status(200).json({ category , message : "Get Single Category"})
})


/**
 * @DESC CREATE CATEGORY
 * @METHOD POST
 * @ROUTE /api/v1/category
 * @ACCESS PUBLIC 
 * 
 */
export const createCategory = asyncHandler(async(req, res) => {
  // get form data 
  const { name, color, subCat } = req.body;

  if (!name || !color ) {
    return res.status(400).json({ message : "All fields are Required" })
  };

   // photo manage 
   let filedata = null;

   if(req.file){
    const data = await fileUploadToCloud(req.file.path)
    filedata = data.secure_url;
   }; 

     // create category 
     const category = await Category.create({ name, subCat, color, photo : filedata  });

    // save data 
    return res.status(201).json({ category,  message : "Category Created Successfull"})
})


/**
 * @DESC DELETE CATEGORY
 * @METHOD DETETE
 * @ROUTE /api/v1/category/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteCategory = asyncHandler(async(req, res) => {
     // get params 
     const { id } = req.params;

     // delete category data 
     const category = await Category.findByIdAndDelete(id);
  
     // check category
     if (!category) {
       return res.status(404).json({ message : "Category not found" })
     }

    // delete cloud file
    await fileDeleteFromCloud(findPublicId(category.photo));

   return res.status(200).json({ category,  message : "Category Deleted Successfull"})
})


/**
 * @DESC UPDATE CATEGORY
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/category/:id 
 * @ACCESS PUBLIC 
 * 
 */

export const updateCategory = asyncHandler(async (req, res) => {

    // Get the category ID from parameters
    const { id } = req.params;

    // Get form data from request body
    const { name, color, subCat } = req.body;

    // Fetch the existing category to get the current photo URL
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Photo management
    let filedata = existingCategory.photo; // Keep old photo URL by default

    if (req.file) {
      const data = await fileUploadToCloud(req.file.path);
      filedata = data.secure_url; // Update with new photo URL
    }

    // Update category
    const categoryUpdate = await Category.findByIdAndUpdate(
      id,
      { name, subCat, color, photo: filedata },
      { new: true }
    );

    return res.status(200).json({ categoryUpdate, message: "Category Updated Successfully" });
});




