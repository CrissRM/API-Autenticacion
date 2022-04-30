const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  { App } = require("./config"),
  routerProducts = require("./routes/products.routes"),
  routerUsers = require("./routes/users.routes"),
  routerComment = require("./routes/comment.routes"),
  setupRoles = require("./config/initialSetup"),
  app = express();

setupRoles();
app.set("prot", App.prot);
app.set("host", App.host);
app.set("port", App.port);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/users", routerUsers);
app.use("/api/products", routerProducts);
app.use("/api/comment", routerComment);

module.exports = app;
