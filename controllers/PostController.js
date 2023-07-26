const { Post, User, Review } = require('../models');

module.exports = {
  createNewPost: async (req, res) => {
    const { postName, postContent } = req.body;
    const userId = req.session.currentUser.id;

    try {
      // Create a new post
      const newPost = await Post.create({
        postName,
        postContent,
        userId,
      });

      // Send a success response
      // res.status(200).json({ message: 'Post created successfully' });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create new post' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { postName, postContent } = req.body;

      // Find the post with the provided ID
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Update the post
      post.postName = postName;
      post.postContent = postContent;
      await post.save();

      // Send a success response
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.currentUser.id,
        },
      });

      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }

      res.redirect('/dashboard');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
