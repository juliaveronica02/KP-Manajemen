const Dish = require("../models/dish")
const CheckoutModels = require("../models/checkout");

module.exports = {
  create: (req, res) => {
    CheckoutModels.create({
      dish_id: req.body.dish_id,
      quantity: req.body.quantity,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // getAll (show) berita.
  getAllData: (req, res) => {
    CheckoutModels.findAll({
        include:[
            {
              // model name which we want to include.
              model: Dish, 
              // we have to pass alias as we used while defining.
              as: "dish",
            }
          ]
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  // update byId.
  updateDataById: (req, res) => {
    CheckoutModels.update(
      {
        dish_id: req.body.dish_id,
        quantity: req.body.quantity,
      },
      { where: { id: req.params.checkoutId } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    CheckoutModels.destroy({ where: { id: req.params.checkoutId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    CheckoutModels.findOne({ where: { id: req.params.checkoutId },
        include:[
            {
              // model name which we want to include.
              model: Dish, 
              // we have to pass alias as we used while defining.
              as: "dish",
            }
          ]
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  }
};