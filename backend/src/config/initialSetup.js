const Roles = require("../model/Roles");

const setupRoles = async () => {
  const roles = await Roles.find();
  if (roles.length > 0) return;
  else {
    await Promise.all([
      new Roles({ name: "super-admin" }).save(),
      new Roles({ name: "admin" }).save(),
      new Roles({ name: "moderator" }).save(),
      new Roles({ name: "user" }).save(),
    ]);
  }
};

module.exports = setupRoles;
