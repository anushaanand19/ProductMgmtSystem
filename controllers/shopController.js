const Product = require("../models/product");

exports.getMainPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("../views/shop/shop.pug", {
        title: "Shop",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};
