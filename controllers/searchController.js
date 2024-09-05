

import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

/**
 * @DESC  GET ALL SEARCH PRODUCT
 * @METHOD GET
 * @ROUTE /api/v1/search
 * @ACCESS PUBLIC 
 * 
 */
export const getAllSearchProduct = asyncHandler(async(req, res) => {

  try {
    const query = req.query.q;

   if (!query) {
     return res.status(400).json({ message : "query is required "});
   }

    // get all cart
    const item = await Product.find({
      $or : [
        { name : { $regex : query, $options : "i"} },
        { brand : { $regex : query, $options : "i"} },
        { catName : { $regex : query, $options : "i"} },
      ]
    });

    res.json(item)

  } catch (error) {
     res.status(500).json({ message : "server error"}); 
  }

});




















