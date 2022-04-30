const users = {};
const User = require("../model/User"),
  Role = require("../model/Roles"),
  schemaValidator = require("../helpers/validator"),
  jwt = require("jsonwebtoken"),
  { JSONWebToken } = require("../config");

users.postSignUp = async (req, res) => {
  let { username, email, password, password_repeat, role } = req.body;

  if (!role) role = "user";

  try {
    const value = await schemaValidator.validateAsync({
      username,
      email,
      password,
      password_repeat,
    });
    const searchRole = await Role.findOne({ name: role });
    if (!searchRole) res.status(404).json({ message: "El rol no existe" });
    try {
      const newUser = await new User({
        username: value.username,
        email: value.email,
        password: await User.passwordCrypt(value.password),
        role: searchRole._id,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, JSONWebToken.key_secret, {
        expiresIn: 60 * 60,
      });

      res.json({
        message: "Usuario registrado con éxito",
        token,
      });
    } catch (error) {
      res.status(404).json({ error: "No se pudo crear el usuario" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
  try {
  } catch (error) {
    res.status(404).json({ error: "No se pudo crear el usuario" });
  }
};

users.postSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) res.status(404).json({ message: "El usuario no existe" });
    else {
      const validatePassword = await User.passwordCompare(
        user.password,
        password
      );
      if (!validatePassword)
        res
          .status(404)
          .json({ message: "El usuerio o contraseña no es correcto" });
      else {
        const token = jwt.sign({ id: user._id }, JSONWebToken.key_secret, {
          expiresIn: 60 * 60,
        });
        res.status(200).json({ message: "Ingresando a su cuenta...", token });
      }
    }
  } catch (error) {}
};

users.getAllUsers = async (req, res) => {
  const getUsers = await User.find().populate("role");
  res.json(getUsers);
};

users.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) res.status(404).json({ message: "El usuario no existe" });

  res.status(200).json(user);
};

users.putUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const foundRole = await Role.findOne({ name: role });

    if (!foundRole)
      return res.status(404).json({ message: "No es un rol válido" });

    await User.findByIdAndUpdate(req.params.id, {
      username,
      email,
      role: foundRole._id,
    });

    res.status(200).json({ message: "Datos actualizados" });
  } catch (error) {
    res.status(404).json({ message: "No se pudo editar datos" });
  }
};

users.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.json({ error });
  }
};
module.exports = users;
