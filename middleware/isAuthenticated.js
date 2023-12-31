const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    if (!req.session.isRedirected) {
      req.session.isRedirected = true;
      req.session.returnTo = req.originalUrl;
      return res.redirect('/');
    } else {
      // Redirect has already been performed, so do nothing
      return next();
    }
  }
};

module.exports = isAuthenticated;
