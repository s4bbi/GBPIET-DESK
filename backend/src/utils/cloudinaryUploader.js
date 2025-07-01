const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadResumeToCloudinary(filePath, originalName) {
  try {
    console.log("Uploading to Cloudinary:", filePath);

    const cleanFileName = path.basename(originalName, path.extname(originalName)) + ".pdf";

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // 👈 must be raw for PDF
      folder: "resumes",
      use_filename: true,
      public_id: cleanFileName,
      format: "pdf",
    });

    fs.unlinkSync(filePath); // 🧹 clean up after upload
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
}

module.exports = { uploadResumeToCloudinary };
