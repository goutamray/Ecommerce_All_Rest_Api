
import mongoose from "mongoose";

// create brand schema 
const userSchema = mongoose.Schema({
  name : {
    type: String,
    trim : true,
  },
  phone : {
    type: String,
    trim : true,
  },
  email : {
    type: String,
    trim : true,
  },
  password : {
    type: String,
    trim : true,
  },
  photo : {
      type : String,
      default : null,
    }
},
{
  timestamps : true,
})

//export default 
export default mongoose.model("User", userSchema);








