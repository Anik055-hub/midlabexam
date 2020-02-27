var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})

router.get('/allcontent', function(req, res){
	userModel.getAllcontent(function(results){
		if(results.length > 0){
			res.render('home/allcontent', {contentlist: results});
		}else{
			res.redirect('/home');
		}
	});
})

router.get('/adduser', function(req, res){
		res.render('home/adduser');	
})

router.post('/adduser', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/home/alluser');
			}else{
				res.redirect('/home');
			}
		});
})


router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})

router.get('/editcontent/:cid', function(req, res){
	
	userModel.getBycId(req.params.cid, function(result){
		res.render('home/editcontent', {content: result});
	});
})

router.post('/editcontent/:cid', function(req, res){
	
	var content = {
		contentname: req.body.contentname,
		contenttype: req.body.contenttype,
		contentsize: req.body.contentsize,
		cid: req.params.cid
	};

	userModel.updatecontent(content, function(status){
		if(status){
			res.redirect('/home/allcontent');
		}else{
			res.redirect('/home/editcontent/'+req.params.cid);
		}
	});
})

router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})

router.get('/deletecontent/:cid', function(req, res){
	
	userModel.getBycId(req.params.cid, function(result){
		res.render('home/deletecontent', {content: result});
	});
})

router.post('/deletecontent/:cid', function(req, res){
	
	userModel.deletecontent(req.params.cid, function(status){
		if(status){
			res.redirect('/home/allcontent');
		}else{
			res.redirect('/home/deletecontent/'+req.params.cid);
		}
	});
})

module.exports = router;