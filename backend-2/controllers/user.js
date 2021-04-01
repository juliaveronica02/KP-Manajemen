const UserModel = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 12;
const privateKey = "null"
const Sequelize = require("sequelize")
const {like, or} = Sequelize.Op

module.exports = {
    // create user (register).
    createUser: (req, res) => {
        console.log("request user register", req);
        // find user by email.
    UserModel.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user) {
          // if register with same email, show message email already exists.
          return res.status(401).json({ email: "Email already exists!" });
        } else {
          // find user by phone number.
          UserModel.findOne({ where: { phone: req.body.phone } }).then(
            (user) => {
              if (user) {
                return res
                  .status(402)
                  .json({ phone: "Phone Number already exists!" }); // write same phone when register, show message phone already exists.
              } else {
                // create new user (register), in postman must same with below field and before create at controller must check database and make it same.
                const newUser = new UserModel({
                  username: req.body.username,
                  email: req.body.email,
                  password: req.body.password,
                  passwordConfirm: req.body.passwordConfirm,
                  phone: req.body.phone,
                  image: req.file && req.file.path,
                });
                // hash password.
                bcrypt.genSalt(saltRounds, function (err, salt) {
                  bcrypt.hash(newUser.password, salt, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash; // hash password.
                    newUser
                      .save()
                      .then((result) => {
                        //  password confirm.
                        if (req.body.password !== req.body.passwordConfirm) {
                          res.json("Password undefined");
                        } else {
                          req.body.password == req.body.passwordConfirm;
                          res.json(result);
                        }
                      })
                      .catch((err) => {
                        throw err;
                      });
                  });
                });
              }
            }
          );
        }
      });
    },
    // getAllData.
    getAllData: (req, res) => {
        // handle pagination.
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;
        // declare variable users and count.
        let users;   
        let count;
        // check for keywords.
        const keyword = req.query.keyword ? req.query.keyword : null
        if(keyword) {
            count = UserModel.count({
                where: {
                    [Op.or] : [
                        {id: {[Op.like]: `%${keyword}%`}},
                        {username: {[Op.like]: `%${keyword}%`}},
                        {email: {[Op.like]: `%${keyword}%`}},
                    ]
                }
            }) 
            // call variable users, where UserModel as User table.
            users = UserModel.findAll({
                // not show updatedAt.
                attributes: {exclude: ['updatedAt']},
                where: {
                    [Op.or]: [
                        {id: {[Op.like]: `%${keyword}%`}},
                        {username: {[Op.like]: `%${keyword}%`}},
                        {email: {[Op.like]: `%${keyword}%`}},
                    ]
                }, offset: (pageSize * (page -1)), limit: pageSize})
        }
    },
      // get user by id.
      getDataById: (req, res) => {
        UserModel.findOne({ where: { id: req.params.userId } })
          .then((result) => res.json(result))
          .catch((err) => {
            throw err;
          });
      },
    // delete account by id example 1.
    deleteById: (req,res) => {
      const id = Number(req.params.id);
      const { password } = req.body;
      if (id) {
        // findById change to findByPk.
        UserModel.findByPk(id).then(users => {
          if (users) {
            if (password) {
              bcrypt.compare(password, users.password).then(response => {
                if (response) {
                  UserModel.destroy({ where: { id: id } }).then(() =>
                    res.status(200).send({ message: "Account deleted" })
                  );
                } else {
                  res.status(404).send({
                    message: "Wrong password"
                  });
                }
              });
            } else {
              res.status(400).send({ message: "Please input password" });
            }
          } else {
            res.status(500).send({ message: "User doesnt exist" });
          }
        });
      } else res.status(417).send({ message: "Please specify User ID" });
    },
    // logout.
    logout: (req, res) => {
      res.status(200).send({ message: "Logout successfully!" });
    },
    // user login version 2.
    // user can login with phone or email.
    loginAuthentication: (req, res, next) => {
      // declare email, phone and password.
      let {email, phone, password} = req.body
      // email and phone condition.
      let conditions = !!email ? {where: { email: email }} : { where:{phone: phone}};
      if(email) {
        conditions = {
          where:{email:email},
        }
      } else if (phone) {
        conditions = {
          where: {phone:phone},
        }
      }
      UserModel.findOne({...conditions }).then((user) => {
        if (!user) {
          return res.status(404).json({ emailOrPhoneNotFound: "Email or Phone not found!" });
        } 
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
          console.log(isMatch);
          
          if (isMatch) {
            // User matched Create JWT Payload
            const payload = {
              id: user.id,
              email: user.email,
            };
            // Sign token
            jwt.sign(
              payload,
              privateKey,
              {
                // expiresIn: 31556926, // 1 year in seconds
                expiresIn: "24h", // 24 hours.
              },
              (err, token) => {
                // show below data if success.
                res.json({
                  success: true + " " + "Users Session",
                  token: token,
                  id: user.id,
                  role: user.role,
                  email: user.email,
                  username: user.username
                });
              }
            );
          } else {
            // return error when enter incorrect password.
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
      });
    })
  },
  // update user by id.
  updateDataById: (req,res) => {
    UserModel.update({
        username: req.body.username,
        image: req.file && req.file.path,
    }, {where: {id: req.params.userId}})
    .then((result)=> res.json(result))
    .catch((err) => {throw err})
  }
}