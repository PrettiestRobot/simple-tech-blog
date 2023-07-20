const router = require('express').Router();
const {
  UserController,
  PostController,
  ReviewController,
} = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);

// Post routes
router.post('/posts', isAuthenticated, PostController.createNewPost);
router.delete('/posts/:id', isAuthenticated, PostController.deletePost);

// Review routes
router.post(
  '/posts/:id/reviews',
  isAuthenticated,
  ReviewController.createNewReview
);
router.delete('/reviews/:id', isAuthenticated, ReviewController.deleteReview);

module.exports = router;
