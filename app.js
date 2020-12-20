const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const shopRoute = require("./routes/shopRoute");
const adminRoute = require("./routes/adminRoute");
const MongoConnect = require("./util/database").MongoConnect;
const getDb = require("./util/database").getDb;
const User = require("./models/user");
const Product = require("./models/product");

app.use(express.static(path.join("public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", "views");

app.use((req, res, next) => {
  User.fetchById('5fddb502f16ac674dd0d2e74').then(user => {
    req.user = new User(user._id, user.name, user.email, user.cart); 
    next();
  }).catch(err => console.log("User not found"));
})

app.use("/admin", adminRoute);
app.use(shopRoute);

MongoConnect(() => {
  app.listen(3000);
});
