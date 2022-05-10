const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const { createContainer, InjectionMode, asFunction, Lifetime, asValue } = require('awilix');

const db = require('./database');
const createLogger = require('./utils/logger');
const config = require('./config');

const container = createContainer({
	injectionMode: InjectionMode.PROXY,
});

container.register({
	express: asValue(express),
	mongoose: asValue(mongoose),
	cors: asValue(cors),
	morgan: asValue(morgan),
	db: asFunction(db),
	config: asValue(config),
	errorLogger: asValue(
		createLogger({
			name: 'error',
			datePattern: 'YYYYMMDD',
			maxFiles: 5,
		})
	),
	appLogger: asValue(
		createLogger({
			maxFiles: 5,
			name: 'app',
			datePattern: 'YYYYMMDDHH',
		})
	),
	dbLogger: asValue(
		createLogger({
			name: 'database',
			maxFiles: 5,
		})
	),
});

container.loadModules(
	[
		'src/components/**/*.router.js',
		'src/components/**/*.controller.js',
		'src/components/**/*.validator.js',
		'src/middlewares/*.middleware.js',
		'src/models/*.model.js',
	],
	{
		formatName: 'camelCase',
		resolverOptions: {
			injectionMode: InjectionMode.PROXY,
			lifetime: Lifetime.SINGLETON,
			register: asFunction,
		},
	}
);

module.exports = container;
