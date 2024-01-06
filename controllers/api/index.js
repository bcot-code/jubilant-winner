const router = require("express").Router();

//Routes
const userR = require("./user-routes.js");
const postR = require("./posts-routes.js");
const commentR = require("./comment-route.js");
router.use("/users", userR);
router.use("/Posts", postR);
router.use("/Comments", commentR);

module.exports = router;
