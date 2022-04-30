const comment = {};
const User = require("../model/User"),
  Comment = require("../model/Comment"),
  Product = require("../model/Products"),
  moment = require("moment");

comment.getComment = async (req, res) => {
  const allComent = await Comment.find().populate("username");
  res.json(allComent);
};

comment.postComment = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.id);
  const info = [req.body.comment, Date.now(), user.username];
  product.comments.push(info);
  await product.save();

  res.json({ meesage: "Posteo un comentario" });
};
module.exports = comment;
