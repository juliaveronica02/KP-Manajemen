var express = require('express');
var router = express.Router();
const crudController = require("../controllers/crud")

router.get("/show", crudController.getAllData)
router.get("/show/:crudId", crudController.getDataById)
router.post("/create", crudController.create)
router.put("/edit/:crudId", crudController.updateDataById)
router.delete("/delete/:crudId", crudController.deleteDataById)

module.exports = router;