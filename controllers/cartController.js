
import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";

/**
 * @DESC  GET ALL CART
 * @METHOD GET
 * @ROUTE /api/v1/cart
 * @ACCESS PUBLIC 
 * 
 */
export const getAllCart = asyncHandler(async(req, res) => {
    // get all cart
    const cartList = await Cart.find(req.query);

    // check cart 
    if (!cartList) {
      return res.status(404).json({ cartList : "", message : "Cart Not Found" });
    }

  // response 
  return res.status(200).json({ cartList,  message : "Get All Cart List"});
});


/**
 * @DESC CREATE CART
 * @METHOD POST
 * @ROUTE /api/v1/cart
 * @ACCESS PUBLIC 
 * 
 */
export const createCart = asyncHandler(async(req, res) => {
  // get form data 
  const { productTitle, image, rating, price, quantity, subTotal, productId, userId } = req.body;


    // create new cart 
     const cart = await Cart.create({ 
         productTitle, 
         image, 
         rating, 
         price, 
         quantity, 
         subTotal, 
         productId, 
         userId
       });

    // save data 
    return res.status(201).json({ cart , message : "Cart Created Successfull"})
})


/**
 * @DESC DELETE CART
 * @METHOD DETETE
 * @ROUTE /api/v1/cart/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteCart = asyncHandler(async(req, res) => {
     // get params 
     const { id } = req.params;

     // delete cart data 
     const cart = await Cart.findByIdAndDelete(id);
  
     // check cart 
     if (!cart) {
       return res.status(404).json({ message : "Cart item not found" })
     }

    // send response 
    return res.status(200).json({ cart,  message : "Cart Deleted Successfull"})
})


/**
 * @DESC UPDATE CART
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/cart/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const updateCart = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

   // get form data 
   const { productTitle, image, rating, price, quantity, subTotal, productId, userId } = req.body;


   // update cart
   const cartUpdate = await Cart.findByIdAndUpdate(
    id, 
    {       
      productTitle, 
      image, 
      rating, 
      price, 
      quantity, 
      subTotal, 
      productId, 
      userId 
    }, 
    {new : true});

   return res.status(200).json({ cartUpdate,  message : "Cart Updated Successfull"}); 
});  















