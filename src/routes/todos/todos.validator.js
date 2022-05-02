const Joi = require('joi');

const addTodoSchema = Joi.object({
	title: Joi.string().required().min(2).max(64),
	description: Joi.string().required().min(2).max(1024),
	priority: Joi.number().required().valid(0, 1, 2),
	status: Joi.custom((value, helper) => {
		if (value && value != 'todo') {
			helper.message(`cannot set status to ${value}`);
		}
	}),
});

const updateTodoSchema = Joi.object({
	title: Joi.string().required().min(2).max(64),
	description: Joi.string().required().min(2).max(1024),
	priority: Joi.number().required().valid(0, 1, 2),
	status: Joi.string().required().valid('todo', 'doing', 'done'),
});

module.exports = {
	addTodoSchema,
	updateTodoSchema,
};
