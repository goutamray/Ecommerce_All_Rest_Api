
import mongoose from "mongoose";

// create brand schema 
const orderSchema = mongoose.Schema({
  name : {
    type: String,
    trim : true,
  },
  phone: {
    type : String,
    trim : true,
    default : null,
  },
  address: {
    type : String,
    trim : true,
  },
  zipCode: {
    type : Number,
    trim : true,
    default : null,
  },
  amount: {
    type : Number,
    trim : true,
    default : 0,
  },
  paymentId: {
    type : String,
    trim : true,
    default : null,
  },
  email: {
    type : String,
    trim : true,
  },
  userId: {
    type : String,
    trim : true,
    default : null,
  },
  products : [
    {
      productName : {
        type : String,
      },
      quantity : {
        type : Number,
      },
      price : {
        type : Number,
      },
      image : {
        type : String,
      },
      total : {
        type : Number,
      }
    }
  ]
},
{
  timestamps : true,
})

//export default 
export default mongoose.model("Order", orderSchema);
















