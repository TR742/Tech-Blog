const sequelize = require("../config/connection");
const { User, Comment } = require("../models");

const userData = require("./userData.json");
const commentData = require("./commentData.json");

const seedData = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {});
  
  console.log('working')
  
  process.exit(0);
};

seedData();