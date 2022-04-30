const multer = require("multer"),
  path = require("path"),
  dirMulterStorage = path.join(__dirname, "../public/img/temp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dirMulterStorage);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  )
    cb(null, true);
  else cb(null, false);
}

const upload = multer({ storage: storage, fileFilter });

module.exports = upload;
