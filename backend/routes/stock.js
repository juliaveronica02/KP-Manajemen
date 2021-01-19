var express = require('express');
var router = express.Router();
const StockRoutes = require("../Controllers/stock")

router.post("/create", StockRoutes.create)
router.get("/show", StockRoutes.getAllData)
router.get("/show/:stockId", StockRoutes.getDataById)
router.put("/edit/:stockId", StockRoutes.updateDataById)
router.delete("/delete/:stockId", StockRoutes.deleteDataById)

module.exports = router;