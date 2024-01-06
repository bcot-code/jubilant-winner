const router = require("express").Router();
const withAuth = require("../../utils/auth");
const user = require("../../Models/user");
const post = require("../../Models/Post");
const comment = require("../../Models/Comments");

// route to get all the Posts
router.get("/", (req, res) => {
  // find all the Posts and return them in json format
  post
    .findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: user,
          attributes: ["username"],
        },
        {
          model: comment,
          attributes: ["id", "content", "user_id", "post_id"],
          include: {
            model: user,
            attributes: ["username", "created_at"],
          },
        },
      ],
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single POST
router.get("/:id", (req, res) => {
  post
    .findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_text", "date_created"],
      include: [
        {
          model: user,
          as: "user",
          attributes: ["username"],
        },
        {
          model: comment,
          as: "Comments",
          attributes: ["id", "post_text", "post_id", "user_id", "date_created"],
        },
      ],
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    });
});
// create new user posted data - use withAuth middleware to prevent access to route
// create new user and POST data ------------------------------------------------
// create new user/POST
router.post("/", withAuth, (req, res) => {
  post
    .create({
      post_text: req.body.post_text,
      date_created: withAuth,
      user_id: req.session.userId,
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
