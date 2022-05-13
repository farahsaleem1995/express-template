const request = require('supertest');

const appFactory = require('../../app');
const container = require('../../container');
const db = container.resolve('db');
let app;

describe('API test', () => {
	beforeAll(async () => {
		app = await appFactory.create(container);
	});

	afterAll(async () => {
		db.disconnect();
	});

	describe('Test GET/ Todos', () => {
		test('It should respond with 200 Ok', async () => {
			const response = await request(app)
				.get('/todos')
				.expect('Content-Type', /application\/json/)
				.expect(200);
		});
	});

	describe('Test POST/ Todos', () => {
		const addTodoValidRequest = {
			title: 'TODO title',
			description: 'The description of TODO.',
			priority: 1,
		};

		const errorResponse = {
			success: false,
		};

		test('It should respond with 201 Created', async () => {
			const response = await request(app)
				.post('/todos')
				.send(addTodoValidRequest)
				.expect('Content-Type', /application\/json/)
				.expect(201);
		});

		test('It should catch missing priority', async () => {
			const { priority, ...data } = addTodoValidRequest;

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});

		test('It should catch invalid priority', async () => {
			const data = Object.assign(addTodoValidRequest, {
				priority: 3,
			});

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});

		test('It should catch missing title', async () => {
			const { title, ...data } = addTodoValidRequest;

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});

		test('It should catch missing description', async () => {
			const { description, ...data } = addTodoValidRequest;

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});

		test('It should catch invalid title min length', async () => {
			const data = Object.assign(addTodoValidRequest, {
				title: 's'.repeat(1),
			});

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});

		test('It should catch invalid title max length', async () => {
			const data = Object.assign(addTodoValidRequest, {
				title: 's'.repeat(65),
			});

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});

		test('It should catch invalid description min length', async () => {
			const data = Object.assign(addTodoValidRequest, {
				description: 's'.repeat(1),
			});

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});

		test('It should catch invalid description max length', async () => {
			const data = Object.assign(addTodoValidRequest, {
				description: 's'.repeat(1025),
			});

			const response = await request(app)
				.post('/todos')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(response.body).toMatchObject(errorResponse);
		});
	});
});
