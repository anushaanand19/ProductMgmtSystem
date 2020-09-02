const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const shopRoute = require("./routes/shopRoute");
const adminRoute = require("./routes/adminRoute");
const MongoConnect = require("./util/database").MongoConnect;
const getDb = require("./util/database").getDb;

app.use(express.static(path.join("public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", "views");

app.use("/admin", adminRoute);
app.use(shopRoute);

MongoConnect(() => {
  app.listen(3000);
});
