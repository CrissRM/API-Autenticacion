const express = require("express"),
  routes = express.Router(),
  users = require("../controllers/users.controller"),
  role = require("../middleware/verifyRole"),
  verifyToken = require("../middleware/authjwt");

routes.post("/signup", users.postSignUp);

routes.post("/signin", users.postSignIn);

routes.get("/route/proteted/users", users.getAllUsers);

routes.get("/route/proteted/user/:id", users.getUser);

routes.put(
  "/route/proteted/user/:id",
  [verifyToken, role.authorizeSuperAdmin],
  users.putUser
);

routes.delete(
  "/route/proteted/user/:id",
  [verifyToken, role.authorizeSuperAdmin],
  users.deleteUser
);

module.exports = routes;
