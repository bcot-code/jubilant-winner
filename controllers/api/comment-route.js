const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// route to get all the Comments
router.get("/", (req, res) => {
  Comment.findAll({
    include: [User, BlogPost],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route to get one comment
router.get("/:id", (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
      },
      {
        model: BlogPost,
      },
    ],
  })
    .then((foundComment) => {
      if (!foundComment) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(foundComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new comment
router.post("/", withAuth, (req, res) => {
  // expects {"username": 'Lord Voldemort', "email": 'voldemort@deathlyhallows.com', "
  // blog_post_id": 1, "text":"I am the one who must not be named."}
  Comment.create({
    ...req.body,
    user_id: req.session.user_id,
    post_id: req.session.post_id,
  })
    .then((createdComment) => {
      res.json(createdComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
