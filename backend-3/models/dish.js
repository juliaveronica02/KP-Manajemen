const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = (require = require(__dirname + '/../config/config.json')[[env]]);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const DishSchema = sequelize.define(
 'dish',
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
  categories: {
   type: Sequelize.STRING,
   required: true,
  },
  image: {
   type: Sequelize.STRING,
   required: true,
  },
  description: {
   type: Sequelize.STRING,
   required: true,
  },
  quantity: {
   type: Sequelize.INTEGER,
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

module.exports = DishSchema;
