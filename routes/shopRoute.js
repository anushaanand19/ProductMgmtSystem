const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/", shopController.getMainPage);
router.get("/product/:prodID", shopController.getProduct);
router.get("/cart/:prodID", shopController.postCart);

module.exports = router;
