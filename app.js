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
  User.fetchById('5f9903c91134917b5353175f').then(user => {
    req.user = user; 
    next();
  }).catch(err => console.log("User not found"));
})

app.use("/admin", adminRoute);
app.use(shopRoute);

MongoConnect(() => {
  app.listen(3000);
});
