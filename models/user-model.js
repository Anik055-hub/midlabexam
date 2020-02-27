var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from user where username=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from user";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getBycId: function(cid, callback){
		var sql = "select * from content where cid=?";
		db.getResult(sql, [cid], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getAllcontent:function(callback){
		var sql = "select * from content";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	
	insert: function(user, callback){
		var sql = "insert into user values(?,?,?,?)";
		db.execute(sql, [null, user.username, user.password, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
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
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deletecontent: function(cid, callback){
		var sql = "delete from content where cid=?";
		db.execute(sql, [cid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update user set username=?, password=?, type=? where id=?";
		db.execute(sql, [user.username, user.password, user.type, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updatecontent: function(content, callback){
		var sql = "update content set contentname=?, contenttype=?, contentsize=? where cid=?";
		db.execute(sql, [content.contentname, content.contenttype, content.contentsize, content.cid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}