var express = require('express');
var router = express.Router();
var pageModel = require('../models/page');
var userModel = require('../models/user');
var app = require('../app.js');

/* GET home page. */
router.get('/', function(req, res, next) { 
   pageModel.find( {"user._id" : req.user._id}, function(err, pages){
    res.render('adminDash', {"pages": pages});
   })
});

function deletepage(idthing){
    console.log("accesses this");
    pageModel.remove( { _id : idthing }, 1 );
}

router.post('/addpage', function(req, res){
    res.render('addPage');
});

router.post('/editingpage', function(req, res){
    pageModel.find( {"user._id" : req.user._id}, function(err, pages){
        console.log(pages[0]._id);
        pageModel.update(
            {"_id": pages[0]._id},
            {"url": req.body.newUrl, "title": req.body.title, "content": req.body.content}
        )
        res.render('editPage', {"page": pages[0]});
    })
});

router.post('/editstuff', function(req, res){
    res.render('editInformation');
});

router.get('/deletingpage/:page', function(req, res){
    console.log(req.body.email);
    console.log(req.user._id);
    userModel.update(
        {"_id": req.user._id},
        {"email": req.body.email, "password": req.body.password }
    )
    res.render('editInformation');
});

router.get('/admin/toggleVisibility/:page', function(req, res){
    pageModel.findOne({"_id": req.params.page}, function(err, page){
        if(page.visibility == true){
            pageModel.update(
            {"_id": req.params.page},
            {"visibility": false}
            )}
        else{
            pageModel.update(
                {"_id": req.params.page},
                {"visibility": true}
                )}
    })
    res.render('adminDash');
});

router.get('/editingstuff/:page', function(req, res){
    console.log(req.body.email);
    console.log(req.user._id);
    userModel.update(
        {"_id": req.user._id},
        {"email": req.body.email, "password": req.body.password }
    )
    res.render('editInformation');
});

router.get('/editpage', function(req, res, next){
    pageModel.find( {"user._id" : req.user._id}, function(err, pages){
        res.render('editPage', {"page": pages[0]});
    })
});

module.exports = router;
