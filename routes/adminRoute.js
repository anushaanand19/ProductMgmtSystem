const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");

router.get("/", adminController.getAdminPage);
router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product", adminController.getEditDeleteProduct);
router.get("/edit/:prodID", adminController.getEditProduct);
router.get("/delete/:prodID", adminController.deleteProduct);
router.post("/:prodID", adminController.updateEditProduct);

module.exports = router;
