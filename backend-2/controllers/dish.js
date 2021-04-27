const DishModels = require('../models/dish');
const Category = require('../models/category');
const fs = require('fs');

module.exports = {
 create: (req, res) => {
  if (DishModels.quantity < 1)
   return res.status(400).json({ status: 'error', message: 'the meal is out of stock.' });
  if (DishModels.quantity - quantity < 0) {
   return res
    .status(404)
    .json({ status: 'error', message: "quantity can not excess stock's quantity" });
  }
  let { name, description, quantity, categories } = req.body;
  DishModels.create({
   name: name,
   image: req.file.path,
   description: description,
   //  category_id: 1, //change in here.
   categories: categories,
   quantity: quantity,
  })
   .then((result) => {
    return res.status(200).json(result);
   })
   .catch((err) => {
    // if failed or getting error to upload it will delete the image.
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
    // image: req.file && req.file.path,
    image: req.file.path,
    description: req.body.description,
    categories: req.body.categories,
    quantity: req.body.quantity,
   },
   { where: { id: req.params.dishId } },
  )
   .then((result) => {
    return res.status(200).json(result);
   })
   .catch((err) => {
    // if failed or getting error to upload it will delete the image.
    fs.unlink(req.file.path, (err) => {
     if (!req.file.path && err) {
      next(err);
     }
    });
    return res.status(400).json('Failed update data!');
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
 getDataById: async (req, res) => {
  const { dishId } = req.params;
  await DishModels.findByPk(dishId, {
   attributes: ['image', 'description', 'name', 'category_id', 'quantity'],
  })
   .then((result) => {
    res.status(200).json(result);
   })
   .catch((err) => {
    throw err;
   });
 },
};
