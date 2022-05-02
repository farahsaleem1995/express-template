const Joi = require('joi');

async function addTodoValidator(obj) {
	const schema = Joi.object({
		title: Joi.string().required().min(2).max(64),
		description: Joi.string().required().min(2).max(1024),
		priority: Joi.number().required().valid(0, 1, 2),
	});

	return await schema.validateAsync(obj, {
		abortEarly: false,
		convert: true,
		stripUnknown: true,
	});
}

async function updateTodoValidator(obj) {
	const schema = Joi.object({
		title: Joi.string().required().min(2).max(64),
		description: Joi.string().required().min(2).max(1024),
		priority: Joi.number().required().valid(0, 1, 2),
		status: Joi.string().required().valid('todo', 'doing', 'done'),
	});

	return await schema.validateAsync(obj, {
		abortEarly: false,
		convert: true,
		stripUnknown: true,
	});
}

module.exports = {
	addTodoValidator,
	updateTodoValidator,
};
