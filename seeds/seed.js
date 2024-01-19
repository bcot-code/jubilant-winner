const sequelize = require("../config/connect");
const userData = require("./usersDta");

const { User } = require("../Models");
const seedAll = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};
seedAll();
