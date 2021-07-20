const InvoiceModels = require("../models/invoice");

module.exports = {
  create: (req, res) => {
    InvoiceModels.create({
        store_name: req.body.store_name,
        sales_name: req.body.sales_name,
        address: req.body.address,
        image: req.file && req.file.path,
        phone: req.body.phone,
        description: req.body.description,
        price: req.body.price,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // getAll (show) berita.
  getAllData: (req, res) => {
    InvoiceModels.findAll({
        // filter price column from lower to higher.
        order: [
            ["price", "ASC"]
        ]
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  // update byId.
  updateDataById: (req, res) => {
    InvoiceModels.update(
      {
        store_name: req.body.store_name,
        sales_name: req.body.sales_name,
        address: req.body.address,
        image: req.file && req.file.path,
        phone: req.body.phone,
        description: req.body.description,
        price: req.body.price,
      },
      { where: { id: req.params.invoiceId } }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  // delete berita by id.
  deleteDataById: (req, res) => {
    InvoiceModels.destroy({ where: { id: req.params.invoiceId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
   // get berita by id.
   getDataById: (req, res) => {
    InvoiceModels.findOne({ where: { id: req.params.invoiceId } })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  }
};