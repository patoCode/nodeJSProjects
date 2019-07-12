const { Comment, Image } = require ('../models');

async function imageCounter(){
	return await Image.countDocuments();
}

async function commentsCounter(){
	return await Comment.countDocuments();
}

async function imageTotalViewCounter(){
	const result = await Image.aggregate([{
		$group:{
			_id:'1',
			viewsTotal:{$sum:'$views'}
		}
	}]);
	if(result.length > 0 )
		return result[0].viewsTotal;
	else
		return 0;
}

async function likesTotalCounter(){
	const result = await Image.aggregate([{
		$group:{
			_id:'1',
			likesTotal:{$sum:'$likes'}
		}
	}]);
	if(result.length > 0 )
		return result[0].likesTotal;
	else
		return 0
}

module.exports = async() => {

	const results = await Promise.all([
		imageCounter(),
		commentsCounter(),
		imageTotalViewCounter(),
		likesTotalCounter()
	]);
	return{
		image: results[0],
		comments: results[1],
		views: results[2],
		likes: results[3],
	};
}