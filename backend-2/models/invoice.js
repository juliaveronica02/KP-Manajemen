const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = (require = require(__dirname + '/../config/config.json')[[env]]);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const InvoiceSchema = sequelize.define(
 'invoice',
 {
  id: {
   type: Sequelize.INTEGER,
   primaryKey: true,
   allowNull: false,
   autoIncrement: true,
  },
  image: {
   type: Sequelize.STRING,
   required: true,
  },
  store_name: {
   type: Sequelize.STRING,
   required: true,
  },
  sales_name: {
   type: Sequelize.STRING,
   required: true,
  },
  description: {
   type: Sequelize.STRING,
   allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
   },
  phone: {
   type: Sequelize.BIGINT,
   required: true,
  },
  price: {
   type: Sequelize.BIGINT,
   required: true,
  },
  createdAt: {
   type: Sequelize.DATE,
  },
  updatedAt: {
   type: Sequelize.DATE,
  },
 },
 { freezeTableName: true },
);
module.exports = InvoiceSchema;
