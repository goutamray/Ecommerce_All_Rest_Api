
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";



/**
 * @DESC  GET ALL ORDER
 * @METHOD GET
 * @ROUTE /api/v1/order
 * @ACCESS PUBLIC 
 * 
 */
export const getAllOrder = asyncHandler(async(req, res) => {
  // get all order
  const orderList = await Order.find();

  // check order 
  if (!orderList) {
    return res.status(404).json({ orderList : "", message : "Order Not Found" });
  }

// response 
return res.status(200).json({ orderList,  message : "Get All Order"});
});



/**
 * @DESC CREATE ORDER
 * @METHOD POST
 * @ROUTE /api/v1/order/create
 * @ACCESS PUBLIC 
 * 
 */
export const createOrder = asyncHandler(async(req, res) => {
  // get form data 
  const { name, phone, address, zipCode, amount, paymentId, email, userId, products } = req.body;

  if (!name || !phone || !email || !address) {
     res.status(400).json({ message : "All fields are Required" })
  };

  // create new order 
  const order = await Order.create({ name, phone, address, zipCode, amount, paymentId, email, userId, products });

  // save data 
  return res.status(201).json({ order , message : "Order Created Successfull"})
})




/**
 * @DESC DELETE ORDER
 * @METHOD DETETE
 * @ROUTE /api/v1/order/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteOrder = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

  // delete order data 
  const order = await Order.findByIdAndDelete(id);

  // check order 
  if (!order) {
    return res.status(404).json({ message : "Order not found" })
  }


 // send response 
 return res.status(200).json({ order,  message : "Order Deleted Successfull"})
})


/**
 * @DESC UPDATE ORDER
 * @METHOD PUT / PATCH
 * @ROUTE /api/v1/order/:id 
 * @ACCESS PUBLIC 
 * 
 */
export const updateOrder = asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

   // get form data 
   const { name, phone, address, zipCode, amount, paymentId, email, userId, products } = req.body;
  
   // update order
   const orderUpdate = await Order.findByIdAndUpdate(
    id, 
    { name, phone, address, zipCode, amount, paymentId, email, userId, products }, 
    {new : true});

   return res.status(200).json({orderUpdate,  message : "Order Updated Successfull"}); 
}); 



