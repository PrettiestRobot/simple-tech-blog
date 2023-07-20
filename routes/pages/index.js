const router = require('express').Router();
const {
  getHomePage,
  getDashboard,
  getUserPost,
} = require('../../controllers/PageController');
const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
// router.get('/', (req, res) => res.render('homepage'));
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Pages with data
router.get('/', isAuthenticated, getHomePage);
router.get('/dashboard', isAuthenticated, getDashboard);
router.get('/dashboard/:id', isAuthenticated, getUserPost);

module.exports = router;
