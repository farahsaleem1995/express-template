const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logging.middleware');
const handler = require('./middlewares/error-handling.middleware');
const todosRouter = require('./routes/todos/todos.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger());

app.use('/todos', todosRouter);

app.use(handler);

module.exports = app;
