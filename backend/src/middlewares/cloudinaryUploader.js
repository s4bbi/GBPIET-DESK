const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "resumes", // always goes inside /resumes
      resource_type: "auto", // auto-detect PDF
      use_filename: true, // keep original filename
      unique_filename: false, // no random hash
      format: "pdf", // force PDF format so headers are correct
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
