const products = {};
const Products = require("../model/Products"),
  Comment = require("../model/Comment"),
  cloudinary = require("../config/cloudinary.config"),
  fse = require("fs-extra"),
  path = require("path"),
  dirMulterEmpty = path.join(__dirname, "../public/img/temp");

products.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
};

products.getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
};

products.postProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imgCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "commpany/cerm/products",
    });
    try {
      const newProduct = await new Products({
        name,
        description,
        price,
        image: imgCloud.url,
        public_id: imgCloud.public_id,
      });
      await newProduct.save();
      await fse.emptyDir(dirMulterEmpty);
      res.status(200).json({ message: "Producto agregado" });
    } catch (error) {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
};

products.putProduct = async (req, res) => {
  try {
    const lastProduct = await Products.findById(req.params.id);
    await cloudinary.uploader.destroy(lastProduct.public_id);
    try {
      const { name, description, price } = req.body;
      const imgCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "commpany/cerm/products",
      });
      try {
        await Products.findByIdAndUpdate(req.params.id, {
          name,
          description,
          price,
          image: imgCloud.url,
          public_id: imgCloud.public_id,
        });

        await fse.emptyDir(dirMulterEmpty);
        res.status(201).json({ message: "Producto actualizado" });
      } catch (error) {
        res.status(404).json({ message: "Not Found", error });
      }
    } catch (error) {
      res.status(404).json({ message: "Not Found", error });
    }
  } catch (error) {
    res.status(404).json({ message: "Not Found", error });
  }
};

products.deleteProducts = async (req, res) => {
  try {
    const lastProduct = await Products.findById(req.params.id);
    await cloudinary.uploader.destroy(lastProduct.public_id);
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Producto Eliminado" });
    } catch (error) {
      res.status(404).json({ message: "Not Found mongoose", error });
    }
  } catch (error) {
    res.status(404).json({ message: "Not Found cloud", error });
  }
};

module.exports = products;
