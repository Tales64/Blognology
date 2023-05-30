const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');

User.hasMany(Blog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'userId'
});

Blog.hasMany(Comment,{
    foreignKey:'blogId'
})

Comment.belongsTo(User, {
    foreignKey:'userId'
})


module.exports = { User, Blog, Comment };