const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')


// initializations
const app = express()

// settings
app.set('port', process.env.PORT || 3001)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout : 'main',
  layoutsDir : path.join( app.get('views'), 'layouts' ),
  partialsDir : path.join( app.get('views'), 'partials' ),
  extname : '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// globals variables
app.use((req, res, next) => {
  next()
})

// routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))

// public
app.use(express.static(path.join(__dirname, 'public')))

// start
app.listen(app.get('port'), () => {
  console.log('SERVER UP ', app.get('port'))
})