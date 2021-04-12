var express = require('express');
var router = express.Router();
const dishController = require("../controllers/dish")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "./public/images/dish/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({
    storage: storage,
  });

router.get("/show", dishController.getAllData)
router.get("/show/:dishId", dishController.getDataById)
router.post("/create", upload.single("image"), dishController.create)
router.put("/edit/:dishId", upload.single("image"), dishController.updateDataById)

module.exports = router;