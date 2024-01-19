//ready to connect to a database in future activities.
const User = require("./user");
const Post = require("./Post");
const Comment = require("./Comments");

User.hasMany(Post, {
  foreignKey: "user_id",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
  hooks: true,
});
User.hasMany(Comment, {
  foreignKey: "user_id",
});
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade",
  hooks: true,
});
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade",
  hooks: true,
});

//creates an object with all of the models that can be used throughout the application
module.exports = { User, Post, Comment };
