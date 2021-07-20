var express = require('express');
var router = express.Router();
const userController = require("../controllers/user")

router.get("/show", userController.getAllData)
router.get("/search", userController.searchUserName)
router.post("/register", userController.createUser)
router.post("/login", userController.loginAuthentication)
router.put("/edit/:userId", userController.updateDataById)

module.exports = router;