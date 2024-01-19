const router = require("express").Router();
const { User, Post, Comment } = require("../Models");
const withAuth = require("../utils/auth");

// WHEN I click on the homepage option in the navigation
// THEN I am taken to the homepage and presented with existing blog Posts that include the post title and the date created
// GET all Posts
router.get("/", async (req, res) => {
  try {
    let results = await Post.findAll({
      include: [{ model: User, attributes: ["username", "password"] }],
    });
    console.log(req.session);
    // Sending back a response with the data in it
    const posts = results.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_In: req.session.logged_In,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one post by id
router.get("/post/:id", async (req, res) => {
  try {
    const singlePost = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });
    if (!singlePost) {
      res.status(404).json({ message: "No post found with that ID" });
    } else {
      res.status(200).json(singlePost);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get user 'name and id
router.get("/user/:id", withAuth, async (req, res) => {
  try {
    const userLoggedIn = req.session.user_id;
    const userId = req.params.id;
    if (!userId || !userLoggedIn) {
      res.redirect("/");
    }
    const userData = await User.findByPk(userId, {
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    if (user.username !== userLoggedIn && userLoggedIn !== "admin")
      return res.redirect("homepage");
    res.render("profile", {
      ...user,
      logged_In: req.session.logged_In,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// WHEN I choose to sign up
// THEN I am prompted to create a username and password
// WHEN I revisit the site at a later time and choose to sign in
// THEN I am prompted to enter my username and password

router.get("/login", (req, res) => {
  // If the session variable is set, then there's an existing logged in user
  if (req.session.logged_In) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const profile = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    const posts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.render("profile", {
      posts,
      logout: "/logout",
      username: profile.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_In) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
