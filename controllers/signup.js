var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');
var contentModel	= require.main.require('./models/content-model');

router.get('/', function(req, res){
	console.log('Registration page requested!');
	res.render('signup/index');
});

module.exports = router;