const config = {
  App: {
    prot: process.env.APP_PROT,
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  Mongoose: {
    prot: process.env.MONGOOSE_PROT,
    host: process.env.MONGOOSE_HOST,
    port: process.env.MONGOOSE_PORT,
    name: process.env.MONGOOSE_NAME,
  },
  Cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  JSONWebToken: {
    key_secret: process.env.JSONWEBTOKEN_KEY_SECRET,
  },
};

module.exports = config;
