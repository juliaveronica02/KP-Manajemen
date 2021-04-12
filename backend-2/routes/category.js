var express = require('express');
var router = express.Router();
const categoryController = require("../controllers/category")

router.get("/show", categoryController.getAllData)
router.get("/show/:categoryId", categoryController.getDataById)
router.post("/create", categoryController.create)
router.put("/edit/:categoryId", categoryController.updateDataById)

module.exports = router;