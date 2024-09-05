

import asyncHandler from "express-async-handler";
import Slider from "../models/Slider.js";
import { 
        fileDeleteFromCloud, 
        fileUploadToCloud } from "../utilis/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @DESC  GET ALL SLIDER
 * @METHOD GET
 * @ROUTE /api/v1/slider
 * @ACCESS PUBLIC 
 * 
 */
 export const getAllSlider = asyncHandler(async(req, res) => {
    // get all slider 
    const sliderList = await Slider.find();

    // check slider 
    if (!sliderList) {
      return res.status(404).json({ sliderList : "", message : "Categories Not Found" });
    }

  return res.status(200).json({ sliderList,  message : "Get All Category"});
});
 
/**
 * @DESC GET SINGLE SLIDER
 * @METHOD GET
 * @ROUTE /api/v1/slider/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleSlider= asyncHandler(async(req, res) => {
  // get params 
 const { id } = req.params;

 // find single category
 const slider = await Slider.findById(id); 

 if (!slider) {
    return res.status(404).json({ message : "Slider Category Data Not Found"});
 }

 return res.status(200).json({ slider , message : "Get Single Slider"})
})


/**
 * @DESC CREATE SLIDER
 * @METHOD POST
 * @ROUTE /api/v1/slider
 * @ACCESS PUBLIC 
 * 
 */
export const createSlider = asyncHandler(async(req, res) => {
  // get form data 
  const { title, subTitle, price, offerText, discount } = req.body;

  if (!title || !price ) {
    return res.status(400).json({ message : "All fields are Required" })
  };

   // photo manage 
   let filedata = null;

   if(req.file){
    const data = await fileUploadToCloud(req.file.path)
    filedata = data.secure_url;
   }; 

    // create slider 
    const slider = await Slider.create({ title, subTitle, price, offerText, discount, photo : filedata  });

    // save data 
    return res.status(201).json({ slider,  message : "Slider Created Successfull"})
})


/**
 * @DESC DELETE SLIDER
 * @METHOD DETETE
 * @ROUTE /api/v1/slider/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteSlider = asyncHandler(async(req, res) => {
     // get params 
     const { id } = req.params;

     // delete slider data 
     const slider = await Slider.findByIdAndDelete(id);
  
     // check slider
     if (!slider) {
       return res.status(404).json({ message : "Slider not found" })
     }

    // delete cloud file
    await fileDeleteFromCloud(findPublicId(slider.photo));

   return res.status(200).json({ slider,  message : "Slider Deleted Successfull"})
})


/**
 * @DESC UPDATE SLIDER
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/slider/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const updateSlider = asyncHandler(async (req, res) => {

    // Get the slider ID from parameters
    const { id } = req.params;

    // Get form data from request body
    const { title, subTitle, price, offerText, discount } = req.body;

    // Fetch the existing slider to get the current photo URL
    const existingSlider = await Slider.findById(id);
    if (!existingSlider) {
      return res.status(404).json({ message: "Slider not found" });
    }


    // Photo management
    let filedata = existingSlider.photo; // Keep old photo URL by default

    if (req.file) {
      const data = await fileUploadToCloud(req.file.path);
      filedata = data.secure_url; // Update with new photo URL
    }

    // Update slider
    const sliderUpdate = await Slider.findByIdAndUpdate(
      id,
      { title, subTitle, price, offerText, discount, photo: filedata },
      { new: true }
    );

    return res.status(200).json({ sliderUpdate, message: "Slider Updated Successfully" });
});




















