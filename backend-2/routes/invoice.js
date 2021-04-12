var express = require('express');
var router = express.Router();
const invoiceController = require("../controllers/invoice")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "./public/images/invoice/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({
    storage: storage,
  });

router.get("/show", invoiceController.getAllData)
router.get("/show/:invoiceId", invoiceController.getDataById)
router.post("/create", upload.single("image"), invoiceController.create)
router.put("/edit/:invoiceId", upload.single("image"), invoiceController.updateDataById)

module.exports = router;