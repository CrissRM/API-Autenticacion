const jwt = require("jsonwebtoken"),
  { JSONWebToken } = require("../config");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authentication"];
    if (!token)
      return res.status(404).json({
        error: "No autorizado",
      });
    else {
      const decoded = jwt.verify(token, JSONWebToken.key_secret);
      req.id = decoded.id;
      next();
    }
  } catch (error) {
    res.status(404).json({ message: "No autorizado" });
  }
};

module.exports = verifyToken;
