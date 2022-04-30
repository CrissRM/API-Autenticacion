const { Schema, model } = require("mongoose");

const rolesSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
});

module.exports = model("Roles", rolesSchema);
