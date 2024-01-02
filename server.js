const path = require("path");
const express = require("express");
const session = require("express-session");
// Require any other packages we need which are specific to this problem/assignment
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const routes = require("./controllers");

const Sequelize = require("./config/connect");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//Set up HANDLEBARS.js engine with custome helpers
const hbs = exphbs.create({ helpers });
// Express middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// MiddleWare for data parsing - thru req.body for html other statis data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sess = {
  secret: "Super secret secret", // It is important to note that this secret should not be shared, so it should be kept in an environment variable.
  cookie: {},
  resave: false, //When this is set to false, the session will not be saved when unchanged.
  saveUninitialized: true, // When this is set to true, it allows uninitialized sessions to be saved to the store. This may have privacy implications, as the data of an uninitialized session might not be under the control of the application developer.
  store: new SequelizeStore({
    db: Sequelize, // the sequelize instance
  }),
};
// Sets up sessions
app.use(session(sess));
//Inform Express.js on which template  engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Make public a static directory
app.use(express.static(path.join(__dirname, "public")));
// Turn on routes
app.use(routes);
// Start listening!
sequelizeConnection.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
  );
});
