
var mongo=require("mongodb");
var server=mongo.Server("localhost",27017,{auto_reconnect:true});
var db=new mongo.Db("emicnet",server,{safe:true});

var dbControl={
	save:function(model,data){
		db.open(function (err,db) {
		    db.collection(model, function (err,collection) {
		        if(err){
		        	throw err;
		        }else{
		            collection.insert(data, function (err,docs) {
		                 console.log(docs);
		                 db.close();
		            });
		        }
		    });
		});
	},
	remove:function(model,con){
		db.open(function (err,db) {
		    db.collection(model, function (err,collection) {
		        if(err){
		        	throw err;
		        }else{
		            collection.remove(con, function (err,docs) {
		                 console.log("删除成功");
		                 db.close();
		            });
		        }
		    });
		});
	},
	updata:function(model,con,data){
		db.open(function (err,db) {
		    db.collection(model, function (err,collection) {
		        if(err){
		        	throw err;
		        }else{
		            collection.update(con,data, function (err,docs) {
		                 console.log("更新成功");
		                 db.close();
		            });
		        }
		    });
		});
	},
	insert:function(model,con,data){
		db.open(function (err,db) {
		    db.collection(model, function (err,collection) {
		        if(err){
		        	throw err;
		        }else{
		            collection.update(con,data, function (err,docs) {
		                 console.log("插入成功");
		                 db.close();
		            });
		        }
		    });
		});
	}
}


