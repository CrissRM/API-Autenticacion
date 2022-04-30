const { Schema, model } = require("mongoose"),
  bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Por favor, ingrese un nombre de usuario"],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Por favor, ingrese un email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Por favor, ingrese una contraseña"],
    },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: "Roles",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.passwordCrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.statics.passwordCompare = async (passwordSave, passwordIn) => {
  return bcrypt.compareSync(passwordIn, passwordSave);
};

module.exports = model("User", userSchema);
