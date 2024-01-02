const router = require("express").Router();
const { User, BlogPost } = require("../models");

// const withAuth = require('../utils/auth');

//create new blog post
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    //res.status(200).json(newBlogPost);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//update a blog post
router.put("/:id", async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({ where: { id: req.params.id } });
    if (!blogData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all posts for dashboard page
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll().catch((err) => {
      console.log(err);
    });
    const userLogins = blogPosts.map((blog) => blog.dataValues.user_id);
    let users = [];
    for (let i = 0; i < userLogins.length; i++) {
      const userInfo = await User.findByPk(userLogins[i]);
      users.push(userInfo);
    }
    for (let j = 0; j < users.length; j++) {
      blogsUserId = [];
      for (let k = 0; k < userLogins.length; k++) {
        if (users[j].id === users[k].id) {
          blogsUserId.push(blogPosts[k]);
        }
      }
      users[j] = { ...users[j].dataValues, blogs: blogsUserId };
    }
    res.render("dashboard", {
      logged_in: req.session.logged_in,
      username: req.session.username,
      blogposts: users,
    });
  } catch (e) {
    console.log("Error in getting data from database");
    res.status(500).json(e);
  }
});

// delete or update my post and taken back to an updated dashboard
router.delete("/mypost/:id", async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.destroy({
      where: { id: req.params.id },
    });
    //if no post was found with that id then send a 404
    if (!deletedBlogPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
