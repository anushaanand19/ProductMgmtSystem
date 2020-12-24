const Product = require("../models/product");
const User = require("../models/user");
const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

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
      let totalAmount = cartItems.reduce(
        (acc, curr) => acc + parseInt(curr.price),
        0
      );
      res.render("../views/shop/display-cart.pug", {
        cartItems: cartItems,
        title: "Your Cart",
        totalAmount: totalAmount,
      });
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
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.deleteFromCart = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.fetchByID(prodID)
    .then((product) => {
      return req.user.removeFromCart(product);
    })
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};
