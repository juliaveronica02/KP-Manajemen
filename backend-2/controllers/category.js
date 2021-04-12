const CategoryModels = require("../models/category");

module.exports = {
  create: (req, res) => {
    CategoryModels.create({
      name: req.body.name
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // getAll (show) berita.
  getAllData: (req, res) => {
    CategoryModels.findAll({})
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  // update byId.
  updateDataById: (req, res) => {
    CategoryModels.update(
      {
        name: req.body.name
      },
      { where: { id: req.params.categoryId } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    CategoryModels.destroy({ where: { id: req.params.categoryId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    CategoryModels.findOne({ where: { id: req.params.categoryId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  }
};