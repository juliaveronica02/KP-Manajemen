const CRUDModels = require("../models/crud");

module.exports = {
  create: (req, res) => {
    CRUDModels.create({
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        city: req.body.city,
        country: req.body.country,
        gender: req.body.gender,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // getAll (show) berita.
  getAllData: (req, res) => {
    CRUDModels.findAll({})
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  // update byId.
  updateDataById: (req, res) => {
    CRUDModels.update(
      {
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        city: req.body.city,
        country: req.body.country,
        gender: req.body.gender,
      },
      { where: { id: req.params.crudId } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    CRUDModels.destroy({ where: { id: req.params.crudId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    CRUDModels.findOne({ where: { id: req.params.crudId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  }
};