const Sequelize = require("sequelize")
const Category = require("./category")
const env = process.env.NODE_ENV || "development";
const config = (require = require(__dirname + "/../config/config.json")[[env]]);
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  const DishSchema = sequelize.define(
    "Dish",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        category_id: {
            type: Sequelize.INTEGER,
            // this is a references to another models.
            references: {model: Category},
            // this is the column name of the references model.
            key: 'id',
            defaultValue: "lorem ipsum"
        },
        name: {
            type: Sequelize.STRING,
            required: true,
        },
        categories:{
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
            type: Sequelize.DATE
        }
    },
    {freezeTableName: true}
)
// DishSchema.belongsTo Category (From models that we declare or call from other file),
// the file name as "category", the foreignKey field was "category_id".
DishSchema.belongsTo(Category, {as: 'category', foreignKey: "category_id"});

module.exports = DishSchema;