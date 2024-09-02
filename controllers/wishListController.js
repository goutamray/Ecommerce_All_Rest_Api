
import asyncHandler from "express-async-handler";
import WishList from "../models/WishList.js";

/**
 * @DESC  GET ALL WISHLIST
 * @METHOD GET
 * @ROUTE /api/v1/wishlist
 * @ACCESS PUBLIC 
 * 
 */
export const getAllWishList = asyncHandler(async(req, res) => {
    // get all wishlist
    const wishlist = await WishList.find(req.query);

    // check wishlist 
    if (!wishlist) {
      return res.status(404).json({ wishlist : "", message : "Wishlist Not Found" });
    }

  // response 
  return res.status(200).json({ wishlist,  message : "Get All Wishlist"});
});


/**
 * @DESC CREATE WISHLIST
 * @METHOD POST
 * @ROUTE /api/v1/wishlist
 * @ACCESS PUBLIC 
 * 
 */
export const createWishList = asyncHandler(async (req, res) => {
  // Get form data from request body
  const { productTitle, image, rating, price, productId, userId } = req.body;

  try {
    // Check if the product is already in the Wishlist for the current user
    const existingList = await WishList.findOne({ productId : req.body.productId, userId : req.body.userId });

    if (existingList) {
      // Product already in the Wishlist 
      return res.status(400).json({ status: false, message: "Product Already Added Wishlist" });
    }

    // Create a new wishlist item
    const wishlist = await WishList.create({ 
      productTitle, 
      image, 
      rating, 
      price, 
      productId, 
      userId
    });

    // Send a success response
    return res.status(201).json({status: true, wishlist, message: "Wishlist Created Successfully" });

  } catch (error) {
    // Handle server errors
    console.error("Error creating wishlist:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});


/**
 * @DESC DELETE WISHLIST 
 * @METHOD DETETE
 * @ROUTE /api/v1/wishlist/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteWishList = asyncHandler(async(req, res) => {
     // get params 
     const { id } = req.params;

     // delete wishlist data 
     const wishlist = await WishList.findByIdAndDelete(id);
  
     // check wishlist  
     if (!wishlist) {
       return res.status(404).json({ message : "Wishlist item not found" })
     }

    // send response 
    return res.status(200).json({ wishlist,  message : "Wishlist Deleted Successfull"})
})







