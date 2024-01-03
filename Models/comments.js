const sequelize = require("../config/connect");
const { Model, DataTypes } = require("sequelize");

class comment extends Model {}

comment.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoInincrement: true },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // 'referencing' another model
        key: "id", // key in the other table
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      unique: "uniqueCommentPostUser",
      field: "post_id",
      references: {
        model: "post", // 'model' is a reference to another model
        key: "id", // key in the other table
      },
    },
  },
  {
    sequelize, // We need to pass the connection instance
    freezTableName: true,
    timestamps: true, // enable timestamp
    underscored: true, // use underscore as delimiter beetween column name and prefix
    modelName: "comment",
  }
);

module.exports = comment;
