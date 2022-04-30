const role = {};
const User = require("../model/User"),
  Role = require("../model/Roles");

role.authorizeSuperAdmin = async (req, res, next) => {
  const user = await User.findById(req.id);
  if (user.role[0].name === "super-admin") next();
  else
    res
      .status(404)
      .json({ message: "No esta autorizado a realizar esta operación" });
};

role.authorizeSuperAdminAndAdmin = async (req, res, next) => {
  const user = await User.findById(req.id);

  if (user.role[0].name === "super-admin" || user.role[0].name === "admin")
    next();
  else
    res
      .status(404)
      .json({ message: "No esta autorizado a realizar esta operación" });
};

role.authorizeSuperAdminAndAdminAndModerator = async (req, res, next) => {
  const user = await User.findById(req.id);

  if (
    user.role[0].name === "super-admin" ||
    user.role[0].name === "admin" ||
    user.role[0].name === "moderator"
  )
    next();
  else
    res
      .status(404)
      .json({ message: "No esta autorizado a realizar esta operación" });
};
module.exports = role;
