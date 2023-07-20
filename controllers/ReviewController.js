const { Post, User, Review } = require('../models');

module.exports = {
  createNewReview: async (req, res) => {
    const {
      body: { reviewContent },
    } = req;
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId);

      if (!post) {
        console.log('Post not found');
        return res.status(404).json({ error: 'Post not found' });
      }
      const newReview = await Review.create({
        postId,
        reviewContent,
        userId: req.session.currentUser.id,
      });
      res.status(200).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteReview: async (req, res) => {
    const { id } = req.params;

    try {
      // Find the review with the provided ID
      const review = await Review.findByPk(id);

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      // Delete the review
      await review.destroy();

      // Send a success response
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete review' });
    }
  },
};
