const User = require('./User');
const Post = require('./Post');
const Review = require('./Review');

module.exports = {
  User,
  Post,
  Review,
};

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Review, { foreignKey: 'postId' });
Review.belongsTo(Post, { foreignKey: 'postId' });
