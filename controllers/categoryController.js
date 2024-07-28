
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
    const categoryList = await Category.find();

    // check category 
    if (categoryList.length === 0 ) {
      return res.status(404).json({ 
        categoryList : "", 
        message : "Categories Not Found" });
    }

  return res.status(200).json({ categoryList: categoryList,  message : "Get All Category"});
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
     return  res.status(404).json({ message : "Single Category Data Not Found"});
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
  const { name, color } = req.body;

  if (!name || !color) {
     res.status(400).json({ message : "All fields are Required" })
  };

   // photo manage 
   let filedata = null;

   if(req.file){
    const data = await fileUploadToCloud(req.file.path)
    filedata = data.secure_url;
   }; 

     // create category 
     const newCategory = await Category.create({ name, color, photo : filedata  });

    // save data 
    return res.status(201).json({ category : newCategory,  message : "Category Created Successfull"})
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
export const updateCategory = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

   // get form data 
   const { name, color } = req.body;


  // photo manage 
  let filedata = null;

  if(req.file){
    const data = await fileUploadToCloud(req.file.path)
    filedata = data.secure_url;
  }; 

 // update category
  const categoryUpdate = await Category.findByIdAndUpdate(
    id, 
    { name, color, photo : filedata }, 
    {new : true});

   
   return res.status(200).json({categoryUpdate,  message : "Category Updated Successfull"})
});  



