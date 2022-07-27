const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Log the configuration
console.log(cloudinary.config());
