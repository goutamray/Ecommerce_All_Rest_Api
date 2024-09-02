
import asyncHandler from "express-async-handler";
import ProductReview from "../models/ProductReview.js";

/**
 * @DESC  GET ALL PRODUCT REVIEW 
 * @METHOD GET
 * @ROUTE /api/v1/review
 * @ACCESS PUBLIC 
 * 
 */
export const getAllReviews = asyncHandler(async (req, res) => {
  try {
      let reviews = [];

      // Fetch reviews based on productId if provided
      if (req.query.productId) {
          reviews = await ProductReview.find({ productId: req.query.productId });
      } else {
          reviews = await ProductReview.find();
      }

      // If no reviews are found
      if (!reviews) {
          return res.status(404).json({ message: "No reviews found" });
      }

      // Return the reviews
      return res.status(200).json({ reviews, message: "Reviews retrieved successfully" });
  } catch (error) {
      // Handle unexpected errors
      return res.status(500).json({ message: "An error occurred while fetching reviews", error: error.message });
  }
});

/**
 * @DESC  GET SINGLE REVIEW 
 * @METHOD GET
 * @ROUTE /api/v1/review/:id
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleReview = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params;

      // Fetch the review by its ID
      const review = await ProductReview.findById(id);

      // If the review is not found
      if (!review) {
          return res.status(404).json({ message: "Review not found" });
      }

      // Return the review if found
      return res.status(200).json({ review, message: "Singe Review Get successfully" });
  } catch (error) {
      // Handle unexpected errors (e.g., invalid ObjectId)
      return res.status(500).json({ message: "An error occurred while fetching the review", error: error.message });
  }
});

/**
 * @DESC CREATE REVIEW 
 * @METHOD POST
 * @ROUTE /api/v1/review/
 * @ACCESS PUBLIC 
 * 
 */
export const addReview = asyncHandler(async (req, res) => {
  const { productId, customerName, review, customerRating, customerId } = req.body;


  // Create a new review
  const newReview = new ProductReview({
      productId,
      customerName,
      customerId,
      review,
      customerRating,
  });

  // Save the review to the database
  const savedReview = await newReview.save();

  res.status(201).json({
      message: "Review added successfully",
      review: savedReview,
  });
});


/**
 * @DESC DELETE REVIEW 
 * @METHOD DELETE
 * @ROUTE /api/v1/review/:id
 * @ACCESS PUBLIC 
 * 
 */
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await ProductReview.findByIdAndDelete(id);

  // check review data
  if (!review) {
      return res.status(404).json({ message: "Review not found" });
  }

  res.status(200).json({
      review,
      message: "Review deleted successfully",
  });
});


/**
 * @DESC UPDATE REVIEW 
 * @METHOD UPDATE
 * @ROUTE /api/v1/review/:id
 * @ACCESS PUBLIC 
 * 
 */
export const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { review, customerRating } = req.body;

  const existingReview = await ProductReview.findById(id);

  if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
  }

  existingReview.review = review || existingReview.review;
  existingReview.customerRating = customerRating || existingReview.customerRating;

  const updatedReview = await existingReview.save();

  res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
  });
});

