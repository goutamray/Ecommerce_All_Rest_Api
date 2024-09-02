
import mongoose from "mongoose";

// create brand schema 
const productReviewSchema = mongoose.Schema({
  productId : {
    type: String,
  },
  customerName : {
    type: String,
  },
  customerId : {
    type: String,
  },
  review : {
    type: String,
  },
  customerRating : {
    type: Number,
  }

},
{
  timestamps : true,
})

//export default 
export default mongoose.model("ProductReview", productReviewSchema);


















