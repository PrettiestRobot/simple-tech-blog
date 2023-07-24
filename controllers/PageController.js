const { Post, User, Review } = require('../models');

module.exports = {
  getIndexPage: async (req, res) => {
    try {
      // Check if the user is authenticated
      const isAuthenticated = req.session.isAuthenticated || false;
      // Retrieve the 10 most recently created posts along with their associated users
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName'],
            include: {
              model: Post, // Include the Post model again to ensure users with posts are retrieved
            },
          },
          Review,
        ],
        order: [['createdAt', 'DESC']],
        limit: 10,
      });

      // Filter out users who don't have any posts
      const filteredPosts = posts.filter(post => post.User.Posts.length > 0);

      res.render('index', {
        welcomeMessage: 'Welcome to the blog!',
        posts: filteredPosts.map(post => ({
          postName: post.postName,
          postContent: post.postContent,
          postDate: post.postDate.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          firstName: post.User.firstName,
          lastName: post.User.lastName,
        })), // Pass the retrieved posts to the template
        isAuthenticated,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve recent posts' });
    }
  },

  getDashboard: async (req, res) => {
    try {
      const userId = req.session.currentUser.id;

      // Retrieve all posts by the currently logged in user, including associated reviews
      const userPosts = await Post.findAll({
        where: { userId },
        include: [Review],
      });

      res.render('dashboard', {
        welcomeMessage: `Welcome to your dashboard ${req.session.currentUser.firstName}!`,
        isAuthenticated: req.session.isAuthenticated,
        posts: userPosts, // Pass the retrieved user posts to the template
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user posts' });
    }
  },

  getPost: async (req, res) => {
    try {
      const { id } = req.params;

      // Retrieve the post with the specified id, including associated reviews
      const postData = await Post.findByPk(id, {
        include: [Review],
      });

      res.render('post', {
        postName: postData.postName,
        postContent: postData.postContent,
        postDate: postData.postDate.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
        firstName: postData.User.firstName,
        lastName: postData.User.lastName,
        isAuthenticated: req.session.isAuthenticated,
        reviews: postData.Reviews.map(review => ({
          reviewContent: review.reviewContent,
          reviewDate: review.reviewDate.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          firstName: review.User.firstName,
          lastName: review.User.lastName,
        })), // Pass the retrieved reviews to the template
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve post' });
    }
  },
};
