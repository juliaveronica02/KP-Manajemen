const Dish = require("../models/dish")
const StockController = require("../models/stock");

module.exports = {
  create: (req, res) => {
    StockController.create({
      dish_id: req.body.dish_id,
      addQuantity: req.body.addQuantity,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // getAll (show) berita.
  getAllData: (req, res) => {
    StockController.findAll({
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
    StockController.update(
      {
        dish_id: req.body.dish_id,
        addQuantity: req.body.addQuantity,
      },
      { where: { id: req.params.stockId } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    StockController.destroy({ where: { id: req.params.stockId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    StockController.findOne({ where: { id: req.params.stockId },
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