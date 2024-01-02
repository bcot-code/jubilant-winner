const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

//anything that is not a match will be routed to the 404 error page
router.use((req, res) => {
  res.status(404).send("<h1>This route does not exist</h1>");
});
module.exports = router;
