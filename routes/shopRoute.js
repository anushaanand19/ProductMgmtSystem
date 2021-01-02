const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/", shopController.getMainPage);
router.get("/cart", shopController.getUserCart);
router.get("/orders", shopController.getOrder);
router.get("/product/:prodID", shopController.getProduct);
router.get("/postCart/:prodID", shopController.postCart);
router.get("/deleteFromCart/:prodID", shopController.deleteFromCart);

module.exports = router;
