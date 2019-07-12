const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const { format } = require('timeago.js');
const passport = require('passport');

//INIT
const app = express();
require('./database');
require('./config/passport');
// SETTINGS
app.set('port', process.env.PORT || 5001);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');


// MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'mySecretApp',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// GLOBALS
app.use((req, res, next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.errors_msg = req.flash('errors_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});


// ROUTES
app.use(require('./routes'));
app.use(require('./routes/user'));
app.use(require('./routes/notes'));

// STATIC FILES
app.use('/public', express.static(path.join(__dirname,'public')));


//SERVER
app.listen(app.get('port'), () => {
	console.log("SERVER RUN!!!", app.get('port'));
});
