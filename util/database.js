const mongoDb = require("mongodb");
require("dotenv").config();
const MongoClient = mongoDb.MongoClient;
let _db;

const MongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/shop?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  )
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;
