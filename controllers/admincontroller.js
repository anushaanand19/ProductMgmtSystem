const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("../views/admin/add-product.pug", { title: "Add Product" });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const product = new Product(title, author, price, image, description);

  product
    .save()
    .then((prod) => res.redirect("/"))
    .catch((err) => console.log(err));
};
