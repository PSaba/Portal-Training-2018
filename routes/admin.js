var express = require('express');
var router = express.Router();

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/auth/getregister');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
    res.render('adminDash');
});

router.get('/addpage', requireLogin, function(req, res, next){
    res.render('addpage');
});

router.get('/editpage', requireLogin, function(req, res, next){
  res.render('editPage');
});
module.exports = router;
