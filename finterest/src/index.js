const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');
//INIT CONFIG
const app = express();
require('./database');

//SETTINGS
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs')


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads'),
	filename: (req, file, cb, filename) => {
		cb(null, uuid() + path.extname(file.originalname))
	}
});
app.use(multer({
	storage: storage
}).single('image'));

//GLOBALS
app.use((req, res, next) => {
	app.locals.format = format;
	next();
});

//ROUTES
app.use(require('./routes/index'));

//STATIC FILES
app.use(express.static(path.join(__dirname,'public')));
//SERVER
app.listen(app.get('port'),()=>{
	console.log("ON");
})