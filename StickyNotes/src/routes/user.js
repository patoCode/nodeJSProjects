const router = require('express').Router();
const passport = require('passport');

//MODELS
const User = require('../models/User');

router.get('/user/signup',(req, res) => {
	res.render('users/signup');
});

router.post('/user/signup', async(req, res) => {
	const {name, email, password, confirm_password} = req.body;
	const errors = [];
	if(password != confirm_password){
		errors.push({text: 'Los password no coinciden'});
	}
	if(password.length < 4){
		errors.push({text: 'Debe ser de mas de 4 caracteres'});
	}
	if(errors.length > 0){
		res.render('users/signup', {errors, name, email, password, confirm_password});
	}else{
		const emailUser = await User.findOne({email: email});
		if(emailUser){
			req.flash('errors_msg','Email Repetido');
			res.render('users/signup', {errors, name, email, password, confirm_password});
		}else{
			const newUser = new User({name, email, password});
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			req.flash('success_msg','Registro exitoso');
			res.redirect('/user/signin');
		}

	}
});

router.get('/user/signin',(req, res) => {
	//INGRESO
	res.render('users/signin');
});

router.post('/user/signin', passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/user/signin',
	failureFlash: true
}));

router.get('/user/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Su session ha sido cerrada.');
  res.redirect('/');
});





module.exports = router;