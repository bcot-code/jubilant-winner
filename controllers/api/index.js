const router = require("express").Router();

//Routes
const userR = require("./user-routes");
const postR = require("./posts-routes");
const commentR = require("./comment-route");
router.use("/users", userR);
router.use("/posts", postR);
router.use("/comments", commentR);

module.exports = router;
