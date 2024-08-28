
import mongoose from "mongoose";

// create brand schema 
const brandSchema = mongoose.Schema({
  name : {
    type: String,
    trim : true,
  },
  photo : {
    type : String,
    trim : true,
    default : null,
  },
},
{
  timestamps : true,
})

//export default 
export default mongoose.model("Brand", brandSchema);











