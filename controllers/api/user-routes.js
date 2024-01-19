const router = require("express").Router();
const User = require("../../Models/user");
const Post = require("../../Models/Post");
const Comment = require("../../Models/Comments");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating a new user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("attempting login", req.body);
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log(dbUserData);
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_In = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get specific user
router.get("/user/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Post }, { model: Comment }],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Create a new user, then add it to the database
// router.post("/user", async (req, res) => {
//   try {
//     const userData = await user.create(req.body);
//     req.session.save(() => {
//       req.session.userId = userData.id;
//       req.session.logged_In = true;
//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
// Update an existing user in the database by its ID
router.put("/user/:id", async (req, res) => {
  try {
    const userData = await user.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  console.log(req.session);
  // When the user logs out, destroy the session
  if (req.session.logged_In) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;
