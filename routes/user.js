
import express from "express";
import { 
  createUser, 
  getAllUsers,
  getSingleUser,
  deleteUser, 
  updateUser, 
  loginUser,
  countUser
} from "../controllers/userController.js";
import verifyAccessToken from "../middlewares/verifyToken.js";

// init router from express  
const router = express.Router(); 

// routes 
router.post("/signup",  createUser); 
router.post("/login", loginUser); 
router.get("/get/count", countUser); 

router.get("/", getAllUsers);      
router.get("/:id", getSingleUser); 
router.delete("/:id", deleteUser);  
router.patch("/:id", verifyAccessToken, updateUser); 


// export default router 
export default router;









