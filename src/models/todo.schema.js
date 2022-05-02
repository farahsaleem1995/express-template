const { Schema, model } = require('mongoose');

const todoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			min: 2,
			max: 64,
		},
		description: {
			type: String,
			required: true,
			min: 2,
			max: 1024,
		},
		status: {
			type: String,
			required: true,
			enum: ['todo', 'doing', 'done'],
		},
		priority: {
			type: String,
			required: true,
			enum: [0, 1, 2],
		},
	},
	{
		id: true,
	}
);

module.exports = todoSchema;
