
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileDeleteFromCloud, fileUploadToCloud } from "../utilis/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @DESC  GET ALL USERS
 * @METHOD GET
 * @ROUTE /api/v1/user
 * @ACCESS PUBLIC 
 * 
 */
export const getAllUsers= asyncHandler(async(req, res) => {
  // get all users
  const userList = await User.find();

  // check users
  if (!userList) {
    return res.status(404).json({ userList : "", message : "User Not Found" });
  }

return res.status(200).json({ userList, message : "Get All Users"});
});



/**
 * @DESC GET ALL SINGLE USER
 * @METHOD GET
 * @ROUTE /api/v1/user/:id
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleUser= asyncHandler(async(req, res) => {
  // get params 
  const { id } = req.params;

  // find single user
  const user = await User.findById(id); 
 
  if (!user) {
     return  res.status(404).json({ message : "Single User Not Found"});
  }
 
  // response 
  return res.status(200).json({ user , message : "Get Single User"})
 }); 


/**
 * @DESC CREATE USER
 * @METHOD POST
 * @ROUTE /api/v1/user/signup
 * @ACCESS PUBLIC 
 * 
 */

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // User validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Check if phone number already exists
  const checkPhoneUser = await User.findOne({ phone });
  if (checkPhoneUser) {
    return res.status(400).json({ message: "Phone number already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Handle file upload
  let filedata = null;
  if (req.file) {
    try {
      const data = await fileUploadToCloud(req.file.path);
      filedata = data.secure_url;
    } catch (error) {
      return res.status(500).json({ message: "Error uploading file" });
    }
  }

  // Create user
  try {
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      photo: filedata,
    });

    if (user) {
      const token = jwt.sign(
        { id: user._id, email },
        process.env.ACCOUNT_ACTIVATION_SECRET,
        { expiresIn: "60m" }
      );

      // Set token in cookie
      res.cookie("accessToken", token, { httpOnly: true });

      // Respond with success
      return res.status(201).json({ user, message: "User created successfully", token });
    } else {
      return res.status(500).json({ message: "Error creating user" });
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
});


/**
 * @DESC LOGIN USER
 * @METHOD POST
 * @ROUTE /api/v1/user/login
 * @ACCESS PUBLIC 
 * 
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    // Password validation
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Create login user token
    const accessToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.USER_LOGIN_SECRET, {
      expiresIn: "365d",
    });

    // set cookie 
    res.cookie("accessToken", accessToken, {
      httpOnly : true,
      secure : process.env.APP_ENV === "Development" ? false : true,
      sameSite : "strict",
      path : "/",
      maxAge : 1000 * 60 * 60 * 24 * 365,
  }); 

     // Response
    return res.status(200).json({ user: existingUser, message: "Login successful", token: accessToken });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


/**
 * @DESC DELETE USER
 * @METHOD DELETE
 * @ROUTE /api/v1/user/:id
 * @ACCESS PUBLIC 
 * 
 */
export const deleteUser= asyncHandler(async(req, res) => {
   // get params 
   const { id } = req.params;

   // delete user data 
   const user = await User.findByIdAndDelete(id);

   // check user 
   if (!user) {
    res.status(404).json({ message : "User Not Found"});
   }
  
  // delete cloud file
  await fileDeleteFromCloud(findPublicId(user.photo)); 

   // delete data 
   res.status(200).json({ user, message : "User deleted successfull"});
});



/**
 * @DESC UPDATE USER
 * @METHOD PUT / PATCH 
 * @ROUTE /api/v1/user/:id
 * @ACCESS PUBLIC 
 * 
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      console.log('User not found:', id);
      return res.status(404).json({ message: "User not found" });
    }

    // Handle photo upload if file is provided
    let filedata = existingUser.photo;  // Keep existing photo if no new file is uploaded
    if (req.file) {
      const data = await fileUploadToCloud(req.file.path); // Upload new photo
      filedata = data.secure_url;  // Update filedata with new uploaded photo URL
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name || existingUser.name,     // Use new name or keep the old one
        email: email || existingUser.email,  // Use new email or keep the old one
        phone: phone || existingUser.phone,  // Use new phone or keep the old one
        photo: filedata,  // Use the updated photo URL or keep the existing one
      },
      { new: true }  // Return the updated user document
    );

    res.status(200).json({ updatedUser, message: "User data updated successfully" });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


/**
 * @DESC COUNT USER
 * @METHOD GET
 * @ROUTE /api/v1/user/get/count
 * @ACCESS PUBLIC 
 * 
 */
export const countUser = asyncHandler(async (req, res) => {
  try {
    const userCount = await User.countDocuments(); 

    if (userCount === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ userCount, message: "User count successfull" });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ message: "Error counting users" });
  }
});


/**
 * @DESC CHANGE PASSWORD
 * @METHOD GET
 * @ROUTE /api/v1/user/changePassword
 * @ACCESS PUBLIC 
 * 
 */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new passwords are required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};







