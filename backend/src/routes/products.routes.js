const express = require("express"),
  products = require("../controllers/products.controller"),
  upload = require("../config/multer.config"),
  verifyToken = require("../middleware/authjwt"),
  role = require("../middleware/verifyRole"),
  routes = express.Router();

routes.get("/", products.getAllProducts);

routes.get("/:id", products.getProduct);

routes.post(
  "/",
  [verifyToken, role.authorizeSuperAdminAndAdmin, upload.single("image")],
  products.postProduct
);

routes.put(
  "/:id",
  [
    verifyToken,
    role.authorizeSuperAdminAndAdminAndModerator,
    upload.single("image"),
  ],
  products.putProduct
);

routes.delete(
  "/:id",
  [verifyToken, role.authorizeSuperAdminAndAdminAndModerator],
  products.deleteProducts
);

module.exports = routes;
