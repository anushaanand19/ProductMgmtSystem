const getDb = require("../util/database").getDb;
const mongoDB = require("mongodb");
const Product = require("./product");

class User {
  constructor(id, name, email, cart) {
    this._id = new mongoDB.ObjectID(id);
    this.name = name;
    this.email = email;
    this.cart = cart;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log("User added!"))
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    let updatedCartItems = new Array();
    if (Object.keys(this.cart).length === 0) {
      updatedCartItems.push({
        productID: new mongoDB.ObjectID(product._id),
        quantity: 1,
      });
    } else {
      updatedCartItems = [...this.cart.items];
      const cartProductIndex = this.cart.items.findIndex((cartProduct) => {
        return cartProduct.productID.toString() === product._id.toString();
      });
      if (cartProductIndex >= 0) {
        updatedCartItems[cartProductIndex].quantity++;
      } else {
        updatedCartItems.push({
          productID: new mongoDB.ObjectID(product._id),
          quantity: 1,
        });
      }
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongoDB.ObjectID(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  removeFromCart(product) {
    const updatedCartItems = [...this.cart.items];
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productID.toString() === product._id.toString();
    });
    let quantity = updatedCartItems[cartProductIndex].quantity;
    if (quantity === 1) {
      updatedCartItems.splice(cartProductIndex, 1);
    } else {
      updatedCartItems[cartProductIndex].quantity--;
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongoDB.ObjectID(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIDs = this.cart.items.map((i) => {
      return i.productID;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIDs } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((q) => {
              return q.productID.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
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

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            id: new mongoDB.ObjectID(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((res) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new mongoDB.ObjectID(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrder() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user.id": new mongoDB.ObjectID(this._id) })
      .toArray();
  }
}

module.exports = User;
