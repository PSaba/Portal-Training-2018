function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/auth/getregister');
  } else {
    next();
  }
};

module.exports = {
  requireLogin
};