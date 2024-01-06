const router = require("express").Router();
const user = require("../Models/user");
const post = require("../Models/Post");
const comment = require("../Models/Comments");

// WHEN I click on the homepage option in the navigation
// THEN I am taken to the homepage and presented with existing blog Posts that include the post title and the date created
// GET all Posts
router.get("/", async (req, res) => {
  try {
    let results = await post.findAll({
      include: [{ model: user, attributes: ["user_id"] }],
    });
    // Sending back a response with the data in it
    const posts = results.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      layout: "main",
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // get one post by id
// router.get("/post/:id", async (req, res) => {
//   try {
//     const singlePost = await post.findByPk(req.params.id, {
//       include: [{ model: comment }],
//     });
//     if (!singlePost) {
//       res.status(404).json({ message: "No post found with that ID" });
//     } else {
//       res.status(200).json(singlePost);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // WHEN I choose to sign up
// // THEN I am prompted to create a username and password
// // WHEN I revisit the site at a later time and choose to sign in
// // THEN I am prompted to enter my username and password

// router.get("/login", (req, res) => {
//   // If the session variable is set, then there's an existing logged in user
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }
//   res.render("login");
// });

// router.get("/signup", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }
//   res.render("signup");
// });

module.exports = router;
