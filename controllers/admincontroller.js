const Product = require("../models/product");
const mongodb = require("mongodb");

exports.getAdminPage = (req, res, next) => {
  res.render("../views/admin/main-admin.pug", { title: "Admin" });
};

exports.getAddProduct = (req, res, next) => {
  res.render("../views/admin/add-product.pug", { title: "Add Product" });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const product = new Product(
    title,
    author,
    price,
    image,
    description,
    null,
    req.user._id
  );

  product
    .save()
    .then((prod) => res.redirect("/admin/edit-product"))
    .catch((err) => console.log(err));
};

exports.getEditDeleteProduct = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("../views/admin/edit-delete.pug", {
        title: "Edit Product",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.fetchByID(prodID)
    .then((product) =>
      res.render("../views/admin/edit-product.pug", {
        prod: product,
        title: "Edit Product",
      })
    )
    .catch((err) => console.log(err));
};

exports.updateEditProduct = (req, res, next) => {
  const prodID = new mongodb.ObjectID(req.params.prodID);
  const updatedTitle = req.body.title;
  const updatedAuthor = req.body.author;
  const updatedPrice = req.body.price;
  const updatedImage = req.body.image;
  const updatedDescription = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedAuthor,
    updatedPrice,
    updatedImage,
    updatedDescription,
    prodID
  );
  product
    .save()
    .then((result) => res.redirect("/admin/edit-product"))
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.deletebyID(prodID)
    .then((result) => res.redirect("/admin/edit-product"))
    .catch((err) => console.log(err));
};
