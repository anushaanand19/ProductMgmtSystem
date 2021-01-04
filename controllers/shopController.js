const Product = require("../models/product");
const User = require("../models/user");
const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

exports.getMainPage = (req, res, next) => {
  const cartPrdIDs = req.user.cart.items;
  Product.fetchAll()
    .then((products) => {
      res.render("../views/shop/shop.pug", {
        title: "Shop",
        products: products,
        cartProductIDs: cartPrdIDs,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.fetchByID(prodID)
    .then((product) => {
      res.render("../views/shop/product-details.pug", {
        prod: product,
        title: "Product Details",
      });
    })
    .then((result) => console.log("Updated"))
    .catch((err) => console.log(err));
};

exports.getUserCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cartItems) => {
      res.render("../views/shop/display-cart.pug", {
        cartItems: cartItems,
        title: "Your Cart",
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

exports.getOrder = (req, res, next) => {
  req.user.getOrder().then((order) => {
    res.render("shop/order.pug", {
      orderItems: order,
      title: "Orders",
    });
  });
};
