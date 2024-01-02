const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use the JawsDB provided URL for Heroku deployment
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Otherwise use local host with username, password and database name from .env file
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
// Export the connection to be used in other files
module.exports = sequelize;
