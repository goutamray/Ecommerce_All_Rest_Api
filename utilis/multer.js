import multer from "multer";


// multer setup 
const storage = multer.diskStorage({
  filename : (req, file, cb) => {
    cb(null, Date.now() + "_" + file.fieldname);
  }
})

// multer middleware
export const categoryPhotoMulter = multer({ storage }).single("photo");





