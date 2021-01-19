var express = require('express');
var router = express.Router();
const CheckoutControllers = require("../Controllers/checkout")

router.post("/create", CheckoutControllers.create)
router.get("/show", CheckoutControllers.getAllData)
router.get("/show/:checkoutId", CheckoutControllers.getDataById)
router.put("/edit/:checkoutId", CheckoutControllers.updateDataById)
router.delete("/delete/:checkoutId", CheckoutControllers.deleteDataById)

module.exports = router;