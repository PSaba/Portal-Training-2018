/*add callbacks*/
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

router.post('/addpage', function(req, res){
    res.render('addPage'); 
});

router.post('/savepage/:page/', function(req, res){
    console.log(req.body.content1);
    console.log(req.params.page);
    // Find the product we're updating
   // product_id = ObjectId(req.form['product'])
  //  product = pageModel.find_one({'_id': product_id})
    //Convert the regions provided to a dictionary
  // regions = json.loads(req.form['regions'])


    //Save the new description for the product
    pageModel.findOneAndUpdate(
        {'_id': req.params.page},
        {
            "$set": {
                "content": req.body.content1
        } },
        function(err, page){
            console.log('hi');
            console.log(page);
        }
    )
});

router.get('/editstuff', function(req, res){
    res.render('editInformation');
});

router.post('/deletingpage/:page', function(req, res){
    pageModel.findOneAndRemove({"_id": req.params.page}, function(err, page){
    })
    res.redirect('/admin');
});

router.get('/toggleVisibility/:page', function(req, res){
    pageModel.findOne({"_id": req.params.page}, function(err, page){
        if(page.visible == true){
            pageModel.update(
            {"_id": req.params.page},
            {visible: false}
            , function(err, page){})}
        else{
            pageModel.update(
                {"_id": req.params.page},
                {visible: true}
                , function(err, page){})}
    })
    res.redirect('/admin');
});

router.post('/editingstuff/', function(req, res){
    console.log(req.body);
    console.log(req.page.user._id);
    userModel.update(
        {"_id": req.user._id},
       {$set: {"email": req.body.email, "password": req.body.password }, function(err, page){}}
    )
    res.render('editInformation');
});
router.post('/editingpage/:page', function(req, res){
    console.log(req.params.page);
    console.log(req.body);
        pageModel.findOneAndUpdate(
            {"_id": req.params.page},
            {$set: {"url": req.body.url, "title": req.body.title, "content": req.body.content}},
            function(err, page){
                if(err){
                    if(err.code === 11000){ //Duplicate url
                                   res.render('editpage'), {
                                       page: {
                                           title: req.body.title.trim(),
                                           content: req.body.content.trim(),
                                           url: page.url,
                                       },
                                       error: 'URL already exists (${req.body.url.trim()}). try another'
                                   }
                               }
                return console.error(err);
                    } 
                res.redirect('/admin');
            }
        )
});

router.get('/editpage/:page', function(req, res, next){
    //pagesModel.findOneAndUpdate({_id: req.params.page.trim(), 'user._id': req.user._id},
    //{$set: {"url": req.body.newUrl.trim(), "title": req.body.title.trim(), "content": req.body.content.trim()}},
    // function(err, page){
     //   if(err){
     //       if(err.code === 11000){ //Duplicate url
     //           res.render('editpage'), {
     //               page: {
     //                   title: req.body.title.trim(),
     //                   content: req.body.content.trim(),
     //                   url: page.url,
     //               },
     //               error: 'URL already exists (${req.body.url.trim()}). try another'
     //           }
     //       }
    //        return res.send(err);
    //    } 
        
   // })
   // console.log(req.params.page);
    //pageModel.findOne( {"_id" : req.params.page}, function(err, page){
    //    res.redirect('/admin/editingpage/'+ req.params.page);
    //})
    pageModel.findOne( {"_id" : req.params.page}, function(err, pages){
        console.log(pages);
        res.render('editPage', {"page": pages});
       })
});

module.exports = router;
