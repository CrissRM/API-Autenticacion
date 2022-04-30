const Comment = require("../model/Comment"),
  Product = require("../model/Products");

const idProducts = async (req, res, next) => {
  const products = await Product.findById(req.params.id);
  req.comment_id = products;
};
