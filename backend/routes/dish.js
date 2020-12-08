var express = require('express');
var router = express.Router();
const DishControllers = require("../Controllers/dish")
// import multer module.
const multer = require("multer")

// setting up a middleware specifying the destination for storing the images.
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
  });

router.post("/create", upload.single("imageURL"), DishControllers.create)
router.get("/show", DishControllers.getAllData)
router.get("/show/:dishID", DishControllers.getDataById)
router.put("/edit/:dishID", upload.single("imageURL"), DishControllers.updateDataById)
router.delete("/delete/:dishID", DishControllers.deleteDataById)

module.exports = router;