var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function( result){
				res.render('home/index', {user: result});
	});
});

router.post('/', function(req, res){
	res.render('home/search')
});
	//userModel.getById(req.params.id, function(result){
	//var user = {
		//	id: req.params.id,
		//	username: req.body.username,
			//password: req.body.password,
		//	type: req.body.type
		//};

		//userModel.update(user, function(status){
		//	if(status){
		//		res.redirect('/home/search');
		//	}else{
		//		res.redirect('/home');
		//	}
		//});
		//});
//});
/*router.get('/', function(req, res){
	userModel.getByntype(req.cookies['username','type'], function(result){
		    if(ntype.type = admin){
				res.render('home/index',{user: result});
			}else{
				res.redirect('/login');
			}
		//res.render('home/employeehome', {user: result});
	});
});*/

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/adduser', function(req, res){
		res.render('home/adduser');	
});

router.post('/adduser', function(req, res){
	
		var user = {
			//id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/job_list', function(req, res){
	
		userModel.getAlljob(function(results){
			if(results.length > 0){
				res.render('home/job_list', {joblist: results});
			}else{
				res.redirect('/employeehome');
			}
		});
});



router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
});

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/view_users');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
});


module.exports = router;