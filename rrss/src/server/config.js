const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');
const enrutador = require ('../routes/index');

module.exports = app => {

  // SETTINGS
  app.set('port', process.env.PORT || 3001);
  app.set('views', path.join(__dirname, '../views'));
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers')
  }));
  app.set('view engine', '.hbs');

  //MIDDLEWARE
  app.use(morgan('dev'));
  app.use(multer({
    dest: path.join(__dirname,'../public/upload/temp')
  }).single('image'));
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(express.json());
  //ROUTES
  enrutador(app);

  // STATICS
  app.use('/public', express.static(path.join(__dirname,'../public')));

  //ERROR HANDLERS
  if('development' === app.get('env')){
    app.use(errorHandler);
  }
  return app;
}
