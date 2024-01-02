const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

// route to get all the posts
router
  .put("/:id", (req, res) => {
    BlogPost.findAll({
      attributes: ["id", "title", "content", "date-created"],
      order: [["date-created", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "user_id", "created-date"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
  })
  .then((dbPtData) => res.json(dbPtData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

// get a single POST
router.get("/:id", (req, res) => {
  BlogPost.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_text", "date_created"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "post_text", "post_id", "user_id", "date_created"],
      },
    ],
  }).then((dbPostData) => {
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
  BlogPost.create({
    post_text: req.body.post_text,
    date_created: Date.now(),
    user_id: req.session.userId,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
