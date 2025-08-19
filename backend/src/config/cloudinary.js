const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("./serverConfig");

// config/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "resumes",       // uploads go to resumes folder
//     resource_type: "raw",    // PDF/Docs should use raw
//     use_filename: true,      // keep original file name
//     unique_filename: false,  // don’t add random hash
//     format: "pdf",           // force extension (optional, keeps .pdf)
//   },
// });

module.exports = cloudinary;
