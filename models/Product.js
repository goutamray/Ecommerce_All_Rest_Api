
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
    type: String,
    trim : true,
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
    type : mongoose.Schema.Types.ObjectId,
    ref : "SubCategory",
  }, 
  countInStock : {
    type : Number,
    default : 0,
  }, 
  discount : {
    type : Number,
    trim : true,
  }, 
  productRams : [
    {
      type: String,
      trim : true,
    }
 ], 
  productSize : [
   {
      type: String,
      trim : true,
   }
  ], 
  productWeight : [
    {
       type: String,
       trim : true,
    }
  ], 
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








