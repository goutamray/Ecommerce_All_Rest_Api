
import mongoose from "mongoose";

// create cart schema 
const wishListSchema = mongoose.Schema({
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
export default mongoose.model("WishList", wishListSchema);

















