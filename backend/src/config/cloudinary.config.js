const cloudinary = require("cloudinary").v2,
  { Cloudinary } = require("../config");

cloudinary.config({
  cloud_name: Cloudinary.name,
  api_key: Cloudinary.api_key,
  api_secret: Cloudinary.api_secret,
  secure: true,
});

module.exports = cloudinary;
