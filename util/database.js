const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;
let _db;

const MongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://anusha:c2ti8dvSjMqoZhjQ@cluster0.tem0q.mongodb.net/shop?retryWrites=true&w=majority",
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
