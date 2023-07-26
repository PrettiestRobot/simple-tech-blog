const router = require('express').Router();
const {
  getIndexPage,
  getDashboard,
  getPost,
  getNewPostForm,
} = require('../../controllers/PageController');
const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/', (req, res) => res.render('homepage'));
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Pages with data
router.get('/index', isAuthenticated, getIndexPage);
router.get('/dashboard', isAuthenticated, getDashboard);
router.get('/dashboard/newpost', isAuthenticated, getNewPostForm);
router.get('/dashboard/veiw/:id', isAuthenticated, getPost);

module.exports = router;
