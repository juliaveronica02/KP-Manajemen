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
    "User",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
        },
        password: {
            type: Sequelize.STRING,
            required: true,
        },
        phone: {
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