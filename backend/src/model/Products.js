const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Por favor, ingrese un nombre de producto"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Por favor, ingrese una descripci´pn del producto"],
    },
    price: {
      type: Number,
      required: [true, "Debe ingresar un precio"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
    count_comments: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, "Por favor, cargue una imagen"],
    },
    public_id: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Products", productSchema);
