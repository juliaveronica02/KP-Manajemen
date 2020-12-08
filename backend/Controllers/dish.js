const DishModels = require("../models/dish");

module.exports = {
  create: (req, res) => {
    DishModels.create({
      dishName: req.body.dishName,
      imageURL: req.file && req.file.path,
      description: req.body.description,
      quantity: req.body.quantity,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // getAll (show) berita.
  getAllData: (req, res) => {
    DishModels.findAll()
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  // update byId.
  updateDataById: (req, res) => {
    DishModels.update(
      {
        dishName: req.body.dishName,
        imageURL: req.file && req.file.path,
        description: req.body.description,
        quantity: req.body.quantity,
      },
      { where: { id: req.params.dishID } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    DishModels.destroy({ where: { id: req.params.dishID } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    DishModels.findOne({ where: { id: req.params.dishID } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  }
};