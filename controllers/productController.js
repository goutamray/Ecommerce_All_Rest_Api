
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
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, rating } = req.query;

  const filter = {};


  // Extract category filter from query parameters
  if (category) {
    filter.category = category;
  }

  // Price filtering
  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = parseFloat(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = parseFloat(maxPrice);
    }
  }

  // Rating filtering
  if (rating) {
    filter.rating = { $eq: parseFloat(rating) };
  }

  try {
    // Get all products with category filtering and populated fields
    const productList = await Product.find(filter)
      .populate("category")
      .populate("subCat")
      .limit(15);

    // Check if products were found
    if (!productList || productList.length === 0) {
      return res.status(404).json({ productList: [], message: "Products Not Found" });
    }

    return res.status(200).json({ productList, message: "Get All Products" });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
});


/**
 * @DESC GET ALL RELATED PRODUCT 
 * @METHOD GET
 * @ROUTE /api/v1/product/related-product
 * @ACCESS PUBLIC 
 * 
 */
export const getRelatedProducts = asyncHandler(async (req, res) => {
  const { category, excludeProductId } = req.query;

  const filter = {};

  // Extract category filter from query parameters
  if (category) {
    filter.category = category;
  }

  // Exclude the product by ID
  if (excludeProductId) {
    filter._id = { $ne: excludeProductId };
  }

  try {
    const relatedProducts = await Product.find(filter)
      .populate("category")
      .populate("subCat")
      .limit(15);

    // Check if products were found
    if (!relatedProducts || relatedProducts.length === 0) {
      return res.status(404).json({ relatedProducts: [], message: "No related products found" });
    }

    return res.status(200).json({ relatedProducts, message: "Related products fetched successfully" });
  } catch (error) {
    console.error('Error fetching related products:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
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



