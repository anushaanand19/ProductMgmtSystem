const Product = require("../models/product");
const User = require("../models/user");
const { getDb } = require("../util/database");

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

exports.getProduct = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.fetchByID(prodID)
    .then((product) => {
      res.render("../views/shop/product-details.pug", { prod: product });
    })
    .then((result) => console.log("Updated"))
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cartItems) => {
      res.render("../views/shop/display-cart.pug", { cartItems: cartItems });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.fetchByID(prodID)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
