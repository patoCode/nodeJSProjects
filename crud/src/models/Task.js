const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
	title:{ type: String, required: true },
	description:{ type: String, required: true },
	status:{ type: Boolean, default: false}

});

module.exports = model('Task', taskSchema);


