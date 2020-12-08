const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || "development";
const config = (require = require(__dirname + "/../config/config.json")[[env]]);
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

const UserModel = sequelize.define(
    "Dish",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        dishName: {
            type: Sequelize.STRING,
            required: true,
        },
        imageURL: {
            type: Sequelize.STRING,
            required: true,
        },
        description: {
            type: Sequelize.STRING,
            required: true,
        },
        quantity: {
            type: Sequelize.NUMBER,
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
module.exports = UserModel;