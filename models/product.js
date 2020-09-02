const getDb = require("../util/database").getDb;

class Product {
  constructor(title, author, price, image, description) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.image = image;
    this.description = description;
  }
  save() {
    const db = getDb();
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
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
