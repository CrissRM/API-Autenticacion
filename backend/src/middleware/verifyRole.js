const role = {};
const User = require("../model/User"),
  Role = require("../model/Roles");

role.authorizeSuperAdmin = async (req, res, next) => {
  const user = await User.findById(req.id);
  const role = await Role.findById(user.role[0]);
  if (role.name === "super-admin") next();
  else
    res
      .status(404)
      .json({ message: "No esta autorizado a realizar esta operación" });
};

role.authorizeSuperAdminAndAdmin = async (req, res, next) => {
  const user = await User.findById(req.id);
  const role = await Role.findById(user.role[0]);

  if (role.name === "super-admin" || user.name === "admin") next();
  else
    res
      .status(404)
      .json({ message: "No esta autorizado a realizar esta operación" });
};

role.authorizeSuperAdminAndAdminAndModerator = async (req, res, next) => {
  const user = await User.findById(req.id);
  const role = await Role.findById(user.role[0]);
  if (
    role.name === "super-admin" ||
    role.name === "admin" ||
    role.name === "moderator"
  )
    next();
  else
    res
      .status(404)
      .json({ message: "No esta autorizado a realizar esta operación" });
};
module.exports = role;
