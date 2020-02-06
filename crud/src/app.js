const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();


// DATABASE
mongoose.connect('mongodb://localhost/crud', {
	useNewUrlParser: true
})
	.then(db => console.log('DB OK'))
	.catch(err => console.error('ERROR DB'));


// IMPORT ROUTES
const indexRoutes = require('./routes/index');

// SETTINGS
app.set('port', process.env.PORT || 2019);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// ROUTES
app.use('/', indexRoutes);

// SERVER START
app.listen(app.get('port'), () => {
	console.log(`SERVER ON PORT ${app.get('port')}`);
})


module.exports = app