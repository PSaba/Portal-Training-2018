var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/user');
var pageModel = require('../models/page');

/* GET home page. */

router.get('/', function(req, res, next) {
  pageModel.find( {}, function(err, pages){
    res.render('frontPage', {"pages": pages});
   })
});

router.post('/auth/newPage', function(req, res){
  var newPage = new pageModel({
    title: req.body.title,
    url: req.body.url,
    content: req.body.content,
    user: req.user,
  });
   newPage.save(function(err, page){
    if(err) return console.error(err);
    console.log(page.title);
  });
  res.redirect('/admin');
});

router.post('/auth/register', function(req, res){
  var newUser = new userModel({
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err, user){
    if(err) return console.error(err);
    res.redirect('/admin');
  });
});

router.post('/auth/checkRegister', function(req, res){
  userModel.findOne({ email: req.body.email, password: req.body.password}, function(err, user) {
    if (!user) {
      res.render('adminAuth', { error: 'Invalid email or password.' });
    } else {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;
        res.redirect('/admin');
    }
  });
});

router.get('/auth/getregister', function(req, res){
  res.render('adminAuth');
})

router.get('/test', function(req, res){
  var newUser = new userModel({
    email: 'thi@thi.com',
    password: 'asdsj'
  });
  newUser.save(function(err, user){
    if(err) return console.error(err);
    console.log(user);
  });
  res.end();
})

router.post('/save-page', function(req, res){
  console.log('getting');
  console.log(req);
  // Find the product we're updating
  product_id = ObjectId(request.form['product'])
  product = pageModel.find_one({'_id': product_id})
  //Convert the regions provided to a dictionary
  regions = json.loads(request.form['regions'])

  //Save the new description for the product
  pageModel.findOneAndUpdate(
      {'_id': product_id},
      {
          "$set": {
              "content": regions
      }
  })
});

router.get('/:page', function(req, res){
  pageModel.find( {}, function(err, pages){
    pageModel.findOne({url: req.params.page.trim()},
  function(err, page){
    if(err) return res.send(err);
    if(page && page.visible){
      var seeUpdates;
      if(req.user){
        seeUpdates = (pageModel.user == req.user);
      } else {seeUpdates = false;}
       
        console.log(page._id);
        res.render('cms', {
          title: page.title,
          content: page.content,
          id: page._id,
          seeAll: seeUpdates,
          page: pages,
    //      user: req.session.user._id
        });
    } else {
      res.status(404).send('404 - Not found yo');
    }
   // res.render();
  }
 );
   })

})

module.exports = router;
