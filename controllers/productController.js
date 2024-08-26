
import asyncHandler from "express-async-handler";

import { findPublicId } from "../helpers/helpers.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { fileDeleteFromCloud, fileUploadToCloud } from "../utilis/cloudinary.js";
import Brand from "../models/Brand.js";

 
/**
 * @DESC GET ALL PRODUCT 
 * @METHOD GET
 * @ROUTE /api/v1/product
 * @ACCESS PUBLIC 
 * 
 */
export const getAllProducts =  asyncHandler(async(req, res) => {

    // Get all products with populated fields
    const productList = await Product.find().populate("category").populate("subCat");

      // check product 
      if (!productList) {
        return res.status(404).json({ productList : "", message : "Products Not Found"});
      }; 
  
    return res.status(200).json({ productList, message : "Get All Products"});
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
     return res.status(404).json({ message : "Single Product Data Not Found"});
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

export const createProduct = asyncHandler(async (req, res) => {
  try {
      // Parse productRams to ensure it's an array
      const productRams = JSON.parse(req.body.productRams || "[]");

      // Parse productSize to ensure it's an array
      const productSize = JSON.parse(req.body.productSize || "[]");

      // Parse productWeight to ensure it's an array
      const productWeight = JSON.parse(req.body.productWeight || "[]");

      const categoryData = await Category.findById(req.body.category);
      if (!categoryData) {
          return res.status(404).json({ message: "Category Not Found" });
      }

      // const brandData = await Brand.findById(req.body.brand);
      // if (!brandData) {
      //     return res.status(404).json({ message: "Brand Not Found" });
      // }

      const {
          name,
          subCat,
          description,
          brand,
          price,
          oldPrice,
          category,
          countInStock,
          rating,
          isFeatured,
          discount,
      } = req.body;

      // Validation
      if (!name || !description || !price) {
          return res.status(400).json({ message: "All fields are Required" });
      }

      if (!Array.isArray(productWeight) || productWeight.length === 0 || productWeight.some(weight => typeof weight !== 'string')) {
          return res.status(400).json({ message: "Product weight must be an array of valid strings" });
      }

      // Handle multiple file uploads
      let filedata = [];
      if (req.files && req.files.length > 0) {
          for (const file of req.files) {
              const data = await fileUploadToCloud(file.path);
              filedata.push(data.secure_url);
          }
      }

      // Create product
      const newProduct = await Product.create({
          name,
          subCat,
          description,
          brand,
          price,
          oldPrice,
          category,
          countInStock,
          rating,
          isFeatured,
          discount,
          productRams,
          productSize,
          productWeight,
          photo: filedata,
      });

      return res.status(201).json({ newProduct, message: "Product created successfully" });

  } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// export const createProduct = asyncHandler(async(req, res) => {
//   const categoryData = await Category.findById(req.body.category);

//   // check category  
//   if (!categoryData) {
//    return res.status(404).json({ message : "Category Not Found"});
//   }; 

//   // find single brand id
//   const brandData = await Brand.findById(req.body.brand);

//   // check category  
//   if (!brandData) {
//    return res.status(404).json({ message : "Brand Not Found"});
//   }; 


//   const { name,
//           subCat,
//           description,
//           brand,
//           price,
//           oldPrice,
//           category,
//           countInStock, 
//           rating, 
//           isFeatured,
//           discount,
//           productRams,
//           productSize,
//           productWeight,
//           } = req.body; 

       
//     // validation
//   if (!name || !description || !price) {
//     return res.status(400).json({ message : "All fields are Required" })
//   };

//     // Handle multiple file uploads
//     let filedata = [];

//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const data = await fileUploadToCloud(file.path);
//         filedata.push(data.secure_url);
//       }
//     };



//   // create product 
//   const newProduct = await Product.create({ 
//     name, 
//     subCat,
//     description, 
//     brand, 
//     price, 
//     oldPrice,
//     category, 
//     countInStock, 
//     rating, 
//     isFeatured, 
//     discount,
//     productRams,
//     productSize,
//     productWeight,
//     photo : filedata  
//   });

//    return res.status(201).json({ newProduct,  message : "Product created Successfull"});
// }); 



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
    return res.status(404).json({ message : "Product not found" });
  };

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
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the existing product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Parse productRams to ensure it's an array (if provided)
    const productRams = req.body.productRams ? JSON.parse(req.body.productRams) : product.productRams;

    // Parse productSize to ensure it's an array (if provided)
    const productSize = req.body.productSize ? JSON.parse(req.body.productSize) : product.productSize;

    // Parse productWeight to ensure it's an array (if provided)
    const productWeight = req.body.productWeight ? JSON.parse(req.body.productWeight) : product.productWeight;

    const categoryData = req.body.category ? await Category.findById(req.body.category) : null;
    if (req.body.category && !categoryData) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    // const brandData = req.body.brand ? await Brand.findById(req.body.brand) : null;
    // if (req.body.brand && !brandData) {
    //   return res.status(404).json({ message: "Brand Not Found" });
    // }

    const {
      name,
      subCat,
      description,
      price,
      oldPrice,
      category,
      brand,
      countInStock,
      rating,
      isFeatured,
      discount,
    } = req.body;

    // Validation
    if (!name && !description && !price) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    if (productWeight && (!Array.isArray(productWeight) || productWeight.length === 0 || productWeight.some(weight => typeof weight !== 'string'))) {
      return res.status(400).json({ message: "Product weight must be an array of valid strings" });
    }

    // Handle multiple file uploads (if any)
    let filedata = product.photo; // Keep existing photos if no new files are uploaded
    if (req.files && req.files.length > 0) {
      filedata = [];
      for (const file of req.files) {
        const data = await fileUploadToCloud(file.path);
        filedata.push(data.secure_url);
      }
    }

    // Update product fields
    product.name = name || product.name;
    product.subCat = subCat || product.subCat;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.oldPrice = oldPrice || product.oldPrice;
    product.category = categoryData ? categoryData._id : product.category;
    product.countInStock = countInStock || product.countInStock;
    product.rating = rating || product.rating;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.discount = discount || product.discount;
    product.productRams = productRams;
    product.productSize = productSize;
    product.productWeight = productWeight;
    product.photo = filedata;

    // Save the updated product
    await product.save();

    return res.status(200).json({ product, message: "Product updated successfully" });

  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// old controller 
// export const updateProduct = asyncHandler(async(req, res) => {

//   // get params 
//   const { id } = req.params;

//    // get form data 
//    const { 
//     name,
//     subCat,
//     description,
//     brand,
//     price,
//     oldPrice,
//     category,
//     countInStock, 
//     rating, 
//     isFeatured,
//     discount,
//     productRams,
//     productSize,
//     productWeight,
//     } = req.body; 


//     // Handle multiple file uploads
//     let filedata = [];

//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const data = await fileUploadToCloud(file.path);
//         filedata.push(data.secure_url);
//       }
//     }; 

//  // update product
//   const productUpdate = await Product.findByIdAndUpdate(
//     id, 
//     { name,
//       subCat,    
//       description,
//       brand,
//       price,
//       oldPrice,
//       category,
//       countInStock, 
//       rating, 
//       isFeatured ,
//       discount,
//       productRams,
//       productSize,
//       productWeight, 
//       photo : filedata 
//     }, 
//     {new : true});

//    return res.status(200).json({productUpdate,  message : "Product Updated Successfull"});
// });  

 


