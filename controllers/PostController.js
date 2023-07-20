const { Post, User, Review } = require('../models');

module.exports = {
  createNewPost: async (req, res) => {
    const {
      body: { title, content },
    } = req;
    try {
      const newPost = await Post.create({
        title,
        content,
        userId: req.session.currentUser.id,
      });

      res.status(200).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;

    try {
      // Find the post with the provided ID
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Delete the post
      await post.destroy();

      // Send a success response
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  },
};
