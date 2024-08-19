
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
  }, 
  photo : [
    {
      type : String,
      required : true, 
    }
  ],
  brand : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Brand",
  },
  price : {
    type : Number,
    default : 0, 
  }, 
  oldPrice : {
    type : Number,
    default : 0, 
  }, 
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
  }, 
  subCat : {
    type : String,
    ref : "Category",
  }, 
  countInStock : {
    type : Number,
    default : 0,
  }, 
  rating : {
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








