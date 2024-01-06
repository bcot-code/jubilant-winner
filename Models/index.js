//ready to connect to a database in future activities.
const user = require("./user");
const post = require("./Post");
const comment = require("./Comments");

user.hasMany(post, {
  foreignKey: "user_id",
});
post.belongsTo(user, {
  foreignKey: "user_id",
});
comment.belongsTo(user, {
  foreignKey: "user_id",
  onDelete: "cascade",
  hooks: true,
});
user.hasMany(comment, {
  foreignKey: "user_id",
});
post.hasMany(comment, {
  foreignKey: "post_id",
  onDelete: "cascade",
  hooks: true,
});
comment.belongsTo(post, {
  foreignKey: "post_id",
  onDelete: "cascade",
  hooks: true,
});

//creates an object with all of the models that can be used throughout the application
module.exports = { user, post, comment };
