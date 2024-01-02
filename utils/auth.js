const withAuth = (req, res, next) => {
  //if the user is not logged in , redirect the requ to the login route
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
