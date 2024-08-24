import mongoose from "mongoose";

// create brand schema 
const productWeightSchema = mongoose.Schema({
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
export default mongoose.model("ProductWeight", productWeightSchema);