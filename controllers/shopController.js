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

exports.getProduct = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.fetchByID(prodID)
    .then((product) => {
      res.render("../views/shop/product-details.pug", { prod: product });
    }).then(result=> console.log('Updated'))
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.fetchByID(prodID).then(product => {
    return req.user.addToCart(product);
  }).then(result => console.log("Added the product to the cart")).catch(err=> console.log(err))
}
