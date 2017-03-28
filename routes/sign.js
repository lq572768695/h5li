var express = require('express');
var router = express.Router();
var express = require('express');
var mongo=require("mongodb");
var server=mongo.Server("localhost",27017,{auto_reconnect:true});
var db=new mongo.Db("emicnet",server,{safe:true});
/*签到首页*/
router.get('/', function(req, res, next) {
    res.render('sign/sign', {});
});

/*考勤统计*/
router.get('/sign/emic', function(req, res, next) {
	db.open(function (err,db) {
	    db.collection("emic", function (err,collection) {
	        if(err){
	        	throw err;
	        }else{
	            collection.find().toArray(function(err,emiclist){
	                if(err){
	                	throw  err;
	                }else{
	                    db.close();
	                    //console.log(emiclist)
	                    res.render('sign/emic-list', {
	                    	Emiclist:emiclist
	                    });
	                }
	            });
	        }
	    });
	});
});

/*考勤详情*/
router.get('/sign/detail', function(req, res, next) {
	var from=req.query["from"]
	if(from=="产品组"){
		from="product"
	}else if(from=="开发组"){
		from="web"
	}
	db.open(function (err,db) {
	    db.collection("user",function (err,collection) {
	        if(err){
	        	throw err;
	        }else{
	            collection.find({from:from}).toArray(function(err,userlist){
	                if(err){
	                	throw  err;
	                }else{
	                    db.close();
	                   // console.log(userlist)
	                    res.render('sign/detail', {
	                    	userlist:userlist
	                    });
	                }
	            });
	        }
	    });
	});
});

module.exports = router;
