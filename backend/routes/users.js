var express = require('express');
var router = express.Router();
const userController = require("../Controllers/user");

router.post("/register", userController.createUser)
router.post("/login", userController.loginAuthentication)
router.get("/show", userController.getAllData)
router.get("/logout", userController.logout);

module.exports = router;