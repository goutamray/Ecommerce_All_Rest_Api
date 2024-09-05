

import mongoose from "mongoose";

// create brand schema 
const sliderSchema = mongoose.Schema({
  title : {
    type: String,
    trim : true,
  },
  subTitle : {
    type: String,
    trim : true,
  },
  photo : {
    type : String,
    trim : true,
    default : null,
  },
  price : {
    type: Number,
    trim : true,
    default : 0,
  },
  offerText : {
    type: String,
    trim : true,
    default : null,
  },
  discount : {
    type: Number,
    trim : true,
    default : 0,
  },
},
{
  timestamps : true,
})

//export default 
export default mongoose.model("Slider", sliderSchema);
















