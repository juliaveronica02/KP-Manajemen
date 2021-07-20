var express = require('express');
var router = express.Router();
const addStockController = require("../controllers/add-stock")

router.get("/show", addStockController.getAllData)
router.get("/show/:addId", addStockController.getDataById)
router.post("/create", addStockController.create)
router.put("/edit/:addId", addStockController.updateDataById)

module.exports = router;