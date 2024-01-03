const sequelize = require("../config/connect");
const { Model, DataTypes } = require("sequelize");

class post extends Model {}

post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: "user", // name of target model
        key: "id", // key in target model that we're referencing
      },
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = post;
