var express = require('express');
var router = express.Router();
const reduceStockController = require("../controllers/reduce-stock")

router.get("/show", reduceStockController.getAllData)
router.get("/show/:reduceId", reduceStockController.getDataById)
router.post("/create", reduceStockController.create)
router.put("/edit/:reduceId", reduceStockController.updateDataById)

module.exports = router;