const DishModels = require('../models/dish');
const Category = require('../models/category');
const fs = require('fs');

module.exports = {
 create: (req, res) => {
  let { name, description, quantity } = req.body;
  DishModels.create({
   name: name,
   image: req.file.path,
   description: description,
   category_id: 1, //change in here
   categories: 'item',
   quantity: quantity,
  })
   .then((result) => {
    return res.status(200).json(result);
   })
   .catch((err) => {
    // if failed or getting error to upload it will delete the image
    fs.unlink(req.file.path, (err) => {
     if (!req.file.path && err) {
      next(err);
     }
    });

    return res.status(400).json('Failed adding data!');
   });
 },
 // getAll (show) berita.
 getAllData: (req, res) => {
  DishModels.findAll({
   include: [
    {
     model: Category,
     as: 'category',
    },
   ],
  })
   .then((result) => res.status(200).json(result))
   .catch((err) => res.status(400).json(err));
 },
 // update byId.
 updateDataById: (req, res) => {
  DishModels.update(
   {
    name: req.body.name,
    image: req.file && req.file.path,
    description: req.body.description,
    categories: 'item',
    quantity: req.body.quantity,
   },
   { where: { id: req.params.dishId } },
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
 },
};
