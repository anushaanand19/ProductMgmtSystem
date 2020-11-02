const getDb = require("../util/database").getDb;
const mongoDB = require("mongodb");
const Product = require("./product")

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log("User added!"))
      .catch((err) => console.log(err));
  }
  static fetchById(userID) {
    const db = getDb();
    const userId = new mongoDB.ObjectID(userID);
    return db
      .collection("users")
      .findOne({ _id: userId })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
  static addProduct(prodID) {
    Product.fetchByID({ _id: new mongoDB.ObjectID(prodID)})
      .then(product => console.log(product))
      .catch(err => console.log(err));
  }
}
module.exports = User;
