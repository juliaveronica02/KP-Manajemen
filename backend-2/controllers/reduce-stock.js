const ReduceStockModels = require("../models/reduce-stock");
const Dish = require("../models/dish")

module.exports = {
  create: (req, res) => {
    ReduceStockModels.create({
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
    ReduceStockModels.findAll({
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
    ReduceStockModels.update(
      {
        dish_id: req.body.dish_id,
        quantity: req.body.quantity},
      { where: { id: req.params.reduceId } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    ReduceStockModels.destroy({ where: { id: req.params.reduceId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    ReduceStockModels.findOne({ where: { id: req.params.reduceId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  }
};