const cloudinary = require('cloudinary').v2;
const ENV = require('./env');
const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: ENV.CLOUDINARY_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_SECRET_KEY,
  });
};

module.exports = connectCloudinary;
