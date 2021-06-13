const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = (require = require(__dirname + '/../config/config.json')[[env]]);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const InvoiceSchema = sequelize.define(
 'crud2',
 {
  id: {
   type: Sequelize.INTEGER,
   primaryKey: true,
   allowNull: false,
   autoIncrement: true,
  },
  name: {
   type: Sequelize.STRING,
   required: true,
  },
  department: {
   type: Sequelize.STRING,
   required: true,
  },
  age: {
   type: Sequelize.STRING,
   required: true,
  },
  city: {
   type: Sequelize.STRING,
   allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
   type: Sequelize.STRING,
   required: true,
  },
  image: {
    type: Sequelize.STRING,
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
