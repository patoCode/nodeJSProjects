const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM COMUNIDAD WHERE NOMBRE_SITIO = ?', [username])
  if(rows.length > 0){
    const user = rows[0]
    const valid = await helpers.matchPassword(password, user.COPYRIGHT)
    if (valid){
      done(null, user, req.flash('success','WELLCOME '+ user.NOMBRE_SITIO))
    }else{
      done(null, false, req.flash('messages','ERROR DE PASSWORD!!!'))
    }
  }else{
    done(null, false, req.flash('messages','USERNAME ERROR!!!'))
  }
}))


passport.use('local.signup', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { nombres, apellidoPat, apellidoMat, celular } = req.body
  let newUser = {
      NOMBRE_SITIO: nombres,
      LOGO: apellidoMat + apellidoPat,
      SIGLA: celular,
      COPYRIGHT: password
  }
  newUser.COPYRIGHT = await helpers.encryptPassword(password)
  const result = await pool.query('INSERT INTO COMUNIDAD SET ?', [newUser])
  newUser.ID_COMUNIDAD = result.insertId
  return done(null, newUser)
}))

passport.serializeUser((user, done) => {
  done(null, user.ID_COMUNIDAD)
})

passport.deserializeUser( async (id, done) => {
  const fila = await pool.query('SELECT  * FROM COMUNIDAD WHERE ID_COMUNIDAD = ?', [id])
  done(null, fila[0])
})
