var express = require('express');
var router = express.Router();
const crudController = require("../controllers/crud2")
const multer = require('multer');

const storage = multer.diskStorage({
 destination: (req, res, cb) => {
  cb(null, 'public/images/crud2');
 },
 filename: (req, file, cb) => {
  cb(null, `${Date.now()}-${file.originalname}`);
 },
});
const upload = multer({
 storage: storage,
});
router.get("/show", crudController.getAllData)
router.get("/show/:crudId", crudController.getDataById)
router.post("/create", upload.single('image'), crudController.create)
router.put("/edit/:crudId", upload.single('image'), crudController.updateDataById)
router.delete("/delete/:crudId", crudController.deleteDataById)

module.exports = router;