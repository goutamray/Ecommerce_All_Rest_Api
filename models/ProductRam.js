
import mongoose from "mongoose";

// create brand schema 
const productRamSchema = mongoose.Schema({
  name : {
    type: String,
    trim : true,
    default: null,
  },
},
{
  timestamps : true,
})

//export default 
export default mongoose.model("ProductRam", productRamSchema);



