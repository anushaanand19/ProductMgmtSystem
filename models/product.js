const getDb = require("../util/database").getDb;
const mongoDB = require("mongodb");

class Product {
  constructor(title, author, price, image, description, id,userID) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.image = image;
    this.description = description;
    this._id = id ? new mongoDB.ObjectID(id) : null;
    this.userID = userID;
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
        .then((res) => console.log("updated"))
        .catch((err) => console.log(err));
    }
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => console.log("Product added"))
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }
  static fetchByID(prodID) {
    const productID = new mongoDB.ObjectID(prodID);
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: productID })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }
  static deletebyID(prodID) {
    const db = getDb();
    const productID = new mongoDB.ObjectID(prodID);
    return db
      .collection("products")
      .deleteOne({ _id: productID })
      .then(() => console.log("Deleted"))
      .catch((err) => console.log(err));
  }
}
module.exports = Product;
