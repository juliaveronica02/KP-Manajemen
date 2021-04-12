const DishModels = require("../models/dish");
const Category = require("../models/category")

module.exports = {
  create: (req, res) => {
    DishModels.create({
      name: req.body.name,
      image: req.file && req.file.path,
      description: req.body.description,
      category_id: req.body.category_id,
      categories: req.body.categories,
      quantity: req.body.quantity,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // getAll (show) berita.
  getAllData: (req, res) => {
    DishModels.findAll({
        include: [
            {
                model:Category,
                as: "category",
            }
        ]
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  // update byId.
  updateDataById: (req, res) => {
    DishModels.update(
      {
        name: req.body.name,
        image: req.file && req.file.path,
        description: req.body.description,
        category_id: req.body.category_id,
        quantity: req.body.quantity,
      },
      { where: { id: req.params.dishId } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    DishModels.destroy({ where: { id: req.params.dishId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    DishModels.findOne({ where: { id: req.params.dishId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  }
};