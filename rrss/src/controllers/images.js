const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar')
const controller = {};

controller.index = async (req, res) => {
	let viewModel = { imageData: {}, comments: {} };
	const imageData = await Image.findOne({ filename: { $regex: req.params.image_id } });
	if (imageData) {
		imageData.views = imageData.views + 1;
		viewModel.imageData = imageData;
		await imageData.save();
		const comments = await Comment.find({ imageId: imageData._id });
		viewModel.comments = comments;
		viewModel = await sidebar(viewModel);
		res.render('images', viewModel);
	} else {
		res.redirect('/');
	}
};

controller.create = (req, res) => {
	const saveImage = async () => {
		const imageUrl = randomNumber();
		const images = await Image.find({ filename: imageUrl });
		if (images.length > 0) {
			saveImage();
		} else {
			console.log(imageUrl);
			const ext = path.extname(req.file.originalname).toLowerCase();
			const imageTempPath = req.file.path;
			const targetPath = path.resolve('src/public/upload/' + imageUrl + ext);

			if (ext === '.png' || ext === '.gif' || ext === '.jpg' || ext === '.jpeg') {
				await fs.rename(imageTempPath, targetPath);
				const newImg = new Image({
					title: req.body.title,
					description: req.body.description,
					filename: imageUrl + ext
				});
				const imgSaved = await newImg.save();
				res.redirect('/image/' + imageUrl);
			} else {
				await fs.unlink(imageTempPath);
				res.status(500).json({ error: 'Solo imagenes' });
			}
		}
	};
	saveImage();
};

controller.like = async (req, res) => {
	const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
	if (image) {
		image.likes = image.likes + 1;
		await image.save();
		res.json({ likes: image.likes });
	}
	else {
		res.status(500).json({ error: 'Internal Error' })
	}
};

controller.comment = async (req, res) => {
	const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
	if (image) {
		const newComment = new Comment(req.body);
		newComment.gravatar = md5(newComment.email);
		newComment.imageId = image._id;
		newComment.save()
		res.redirect('/image/' + image.uniqueId);
	} else {
		res.redirect('/');
	}
};

controller.remove = async (req, res) => {
	const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
	if (image) {
		await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
		await Comment.deleteOne({ imageId: image._id });
		await image.remove();
		res.json(true);
	}
	else { }
};

module.exports = controller;
