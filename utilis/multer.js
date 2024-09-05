import multer from "multer";

// multer setup 
const storage = multer.diskStorage({
  filename : (req, file, cb) => {
    cb(null, Date.now() + "_" + file.fieldname);
  }
})

// multer middleware
export const categoryPhotoMulter = multer({ storage }).single("photo");
export const brandPhotoMulter = multer({ storage }).single("photo");
export const productPhotoMulter = multer({ storage }).array("photo", 10);

export const subCategoryPhotoMulter = multer({ storage }).single("photo");

export const userPhotoMulter = multer({ storage }).single("photo");
export const sliderPhotoMulter = multer({ storage }).single("photo");


