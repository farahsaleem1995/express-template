const schema = require('./todo.schema');

/**
 *
 * @param {{mongoose: mongoose}}
 */
function todosModel({ mongoose }) {
	const model = mongoose.model('Todo', schema);

	async function add(todo) {
		Object.assign(todo, {
			status: 'todo',
		});

		const result = await model.create(todo);
		return result.id;
	}

	async function getAll() {
		return await model.find({});
	}

	async function getById(id) {
		return await model.findById(mongoose.Types.ObjectId(id));
	}

	async function update(todo) {
		var result = await model.updateOne({ id: todo['id'] }, todo);

		if (!result.matchedCount || !result.modifiedCount) {
			throw new Error(`Failed to update Todo with ID "${todo.id}"`);
		}
	}

	async function remove(todo) {
		var result = await model.deleteOne({ id: todo['id'] });

		if (!result.matchedCount || !result.modifiedCount) {
			throw new Error(`Failed to delete Todo with ID "${todo.id}"`);
		}
	}

	return {
		add,
		getAll,
		getById,
		update,
		remove,
	};
}

module.exports = todosModel;
