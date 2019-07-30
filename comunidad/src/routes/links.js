const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get('/', isLoggedIn, async (req, res) => {
  const cargos = await pool.query('SELECT * FROM CARGO')
  res.render('links/listar', {cargos})
})

router.get('/add', isLoggedIn, (req, res) => {
  res.render('links/add')
})

router.post('/add', isLoggedIn, async (req, res) => {
  const { title, url, description } = req.body
  const cargo = { NOMBRE_UNIDAD : title,
                  ESTADO : 'ok' }
  await pool.query('insert into CARGO set ?', cargo)
  req.flash('success', 'CARGO CREADO SATISFACTORIAMENTE')
  res.redirect('/links')
})

router.get('/edit/:id', isLoggedIn, async(req, res) => {
  const { id } = req.params
  const cargos = await pool.query( "SELECT * FROM CARGO WHERE ID_CARGO = ?", id)
  res.render('links/edit', { cargo : cargos[0] })
})

router.post('/edit/:id', isLoggedIn, async(req, res) => {
  const { id } = req.params
  const { title, url, description } = req.body
  const newCargo = { NOMBRE_UNIDAD : title,
                     ESTADO : 'ok' }
  const cargo = await pool.query( "UPDATE CARGO SET ? WHERE ID_CARGO = ?", [newCargo, id])
  req.flash('success', 'CARGO EDITADO SATISFACTORIAMENTE')
  res.redirect('/links')
})

router.get('/delete/:id', isLoggedIn, async(req, res) => {
  const { id } = req.params
  await pool.query( "DELETE FROM CARGO WHERE ID_CARGO = ?", id)
  req.flash('success', 'CARGO ELIMINADO SATISFACTORIAMENTE')
  res.redirect('/links')
})

module.exports = router
