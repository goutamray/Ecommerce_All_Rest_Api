import mongoose from "mongoose";

// create cart schema 
const cartSchema = mongoose.Schema({
  productTitle : {
    type: String,
    trim : true,
  },
  image : {
    type : String,
    trim : true,
    default : null,
  },
  rating : {
    type: Number,
    trim : true,
  },
  price : {
    type: Number,
    trim : true,
  },
  quantity : {
    type: Number,
    trim : true,
  },
  subTotal : {
    type: Number,
    trim : true,
  },
  productId : {
    type: String,
    trim : true,
  },
  userId : {
    type: String,
    trim : true,
  },

},
{
  timestamps : true,
})

//export default 
export default mongoose.model("Cart", cartSchema);