
// Checked

const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log(User);

  for (const blog of blogData){
    await Blog.create({
      ...blog,
      // userId: users[Math.floor(Math.random()*users.length)].id,
    })
  }

  const comments = await Comment.bulkCreate(commentData, {
    returning:true,
});

  process.exit(0);
};

seedDatabase();