var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/auth/getRegister');
      } else {
        // expose the user to the template
        res.locals.user = user;
 
        // render the dashboard page
        res.render('adminDash');
      }
    });
  } else {
    res.redirect('/auth/getRegister');
  }
});

router.get('/addpage', function(req, res, next){
    res.render('addpage');
});

router.get('/editpage', function(req, res, next){
  res.render('editPage');
});
module.exports = router;
