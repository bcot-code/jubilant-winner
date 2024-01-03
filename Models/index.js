//ready to connect to a database in future activities.
const user = require("./user");
const post = require("./posts");
const comment = require("./comments");

user.hasMany(post, {
  foreignKey: "user_id",
});
user.hasMany(comment, {
  foreignKey: "user_id",
});
post.hasMany(comment, {
  foreignKey: "post_id",
});
post.belongTo(user, {
  foreignKey: "user_id",
});
comment.belongTo(post, {
  targetKey: "id",
});
comment.belongTo(user, {
  as: "replyUser",
  foreignKey: "reply_user_id",
});
//creates an object with all of the models that can be used throughout the application
module.exports = { user, post, comment };
