const express = require('express');
const cors = require('cors');

const useLogger = require('./middlewares/logging.middleware');
const useErrorHandler = require('./middlewares/error-handling.middleware');
const todosRouter = require('./routes/todos/todos.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(useLogger());

app.use('/todos', todosRouter);

app.use(useErrorHandler);

module.exports = app;
