const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

class comment extends Model {}

comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoInincrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
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
    underscored: true, // use underscore as delimiter beetween column name and prefix
    modelName: "comment",
  }
);

module.exports = comment;
