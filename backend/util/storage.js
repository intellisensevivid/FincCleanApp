const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { config } = require("dotenv");
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: "/tmp/uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
