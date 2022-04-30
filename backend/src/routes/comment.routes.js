const express = require("express"),
  routes = express.Router(),
  comment = require("../controllers/comments.controller"),
  verifyToken = require("../middleware/authjwt");

routes.get("/:id", comment.getComment);
routes.post("/:id", verifyToken, comment.postComment);

module.exports = routes;
