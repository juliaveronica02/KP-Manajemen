const Sequelize = require("sequelize")
const Dish = require("./dish")
const env = process.env.NODE_ENV || "development";
const config = (require = require(__dirname + "/../config/config.json")[[env]]);
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  const AddStockSchema = sequelize.define(
    "add_stock",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        dish_id: {
            type: Sequelize.INTEGER,
             // this is a references to another models.
             references: {model: Dish},
             // this is the column name of the references model.
             key: 'id'
        },
        quantity: {
            type: Sequelize.INTEGER,
            required: true,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
    {freezeTableName: true}
)
AddStockSchema.belongsTo(Dish, {as: 'dish', foreignKey: "dish_id"});

module.exports = AddStockSchema;