var express = require('express');
var router = express.Router();
const userController = require("../controllers/user")
// import multer module.
const multer = require("multer")

// setting up a middleware specifying the destination for storing the images.
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        // don't forget to create folder at public - images - create folder banner400.
      cb(null, "./public/images/users/");
    },
    filename: (req, file, cb) => {
    //   cb(null, file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`); 
    // result: 1610072285140-81QnGdrGwsL._UL1500_.jpg.
    },
  });
  const fileFilter = (req, file, cb) => {
    // image type.
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/show", userController.getAllData)
router.get("/search", userController.searchUserName)
router.post("/register", upload.single("images"), userController.createUser)
router.post("/login", userController.loginAuthentication)
router.put("/edit/:userId", upload.single("images"), userController.updateDataById)

module.exports = router;