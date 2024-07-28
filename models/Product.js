
import mongoose from "mongoose";


// create product schema 
const productSchema = mongoose.Schema({
  name : {
    type: String,
    trim : true,
    required : true,
  },
  description : {
    type: String,
    trim : true,
    required : true,
  }, 
  photo : [
    {
     type : String,
     required : true, 
   },
 ],
  brand : {
    type: String,
    trim : true,
    default : ""
  },
  price : {
    type : Number,
    default : 0, 
  }, 
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
    required : true, 
  }, 
  countInStock : {
    type : Number,
    required : true, 
  }, 
  rating : {
    type : Number,
    default : 0, 
  },
  numReviews : {
    type : Number,
    default : 0, 
  }, 
  isFeatured : {
    type : Boolean,
    default : false,
  }, 

},
{
  timestamps : true,
})
 
//export default 
export default mongoose.model("Product", productSchema);








