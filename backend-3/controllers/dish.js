const DishModels = require('../models/dish');

module.exports = {
 create: (req, res) => {
  DishModels.create({
   name: req.body.name,
   image: req.file && req.file.path,
   description: req.body.description,
   categories: req.body.categories,
   quantity: req.body.quantity,
  })
   .then((result) => {
    return res.status(200).json(result);
   })
   .catch((err) => {
    return res.status(400).json('Failed adding data!');
   });
 },
 // getAll (show) berita.
 getAllData: (req, res) => {
  DishModels.findAll({})
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
    categories: req.body.categories,
    quantity: req.body.quantity,
   },
   { where: { id: req.params.dishId } },
  )
   .then((result) => {
    return res.status(200).json(result);
   })
   .catch((err) => {
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
   attributes: ['image', 'description', 'name', 'quantity', 'categories'],
  })
   .then((result) => {
    res.status(200).json(result);
   })
   .catch((err) => {
    throw err;
   });
 },
};