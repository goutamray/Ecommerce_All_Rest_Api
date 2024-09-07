
import express from "express";
import { 
  createUser, 
  getAllUsers,
  getSingleUser,
  deleteUser, 
  updateUser, 
  loginUser,
  countUser,
  changePassword,
} from "../controllers/userController.js";
 //import verifyAccessToken from "../middlewares/verifyToken.js";
import { userPhotoMulter } from "../utilis/multer.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/signup", userPhotoMulter,  createUser); 
router.post("/login", loginUser); 
router.get("/get/count", countUser); 

router.get("/", getAllUsers);      
router.get("/:id", getSingleUser); 
router.delete("/:id", deleteUser);  
router.patch("/:id", userPhotoMulter, updateUser);

router.patch('/changePassword/:id', changePassword);



// export default router 
export default router;









