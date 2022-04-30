const express = require('express');
const cors = require('cors');

const { handler, logger } = require('./middlewares');
const { todosRouter } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/todos', todosRouter);

app.use(handler);

module.exports = app;
