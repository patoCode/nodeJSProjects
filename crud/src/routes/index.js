const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
	const taskList = await Task.find();
	res.render('index', { taskList });
});

router.post('/add', async (req, res) => {
	const newTask = new Task(req.body)
	await newTask.save();
	res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	task.status = !task.status;
	await task.save();
	res.redirect('/');
});


router.get('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	res.render('edit', {task});
});

router.post('/edit/:id', async (req, res) => {
	const { id } = req.params;
	await Task.update({_id:id}, req.body);
	res.redirect('/');
});


router.get('/delete/:id', async (req, res) => {
	const { id } = req.params;
	await Task.remove({_id: id});
	res.redirect('/');
});

module.exports = router;