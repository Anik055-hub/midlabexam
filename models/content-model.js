var db = require('./db');

module.exports ={
	getByUname: function(cname, callback){
		var sql = "select * from content where contentname=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from content where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from content";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	
	insert: function(content, callback){
		var sql = "insert into user values(?,?,?,?)";
		db.execute(sql, [null, content.contentname, content.contenttype, content.contentsize], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from content where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(content, callback){
		var sql = "update content set contentname=?, contenttype=?, contentsize=? where id=?";
		db.execute(sql, [content.contentname, content.contenttype, content.contentsize, content.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}