const { createLogger: createWinstonLogger, transports, format, addColors } = require('winston');
const winston = require('winston');
const { isDevelopment } = require('./env');
require('winston-daily-rotate-file');

/**
 *
 * @typedef {Object} LoggerOptions
 * @property {String} name A string used to construct log path.
 * @property {Number} maxSize Maximum size of the file after which it will rotate.
 * @property {Number} maxFiles Maximum number of logs to keep.
 * @property {String} datePattern A string representing the moment.js date format.
 * @property {winston.Logform.Format} format Log message format.
 */

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
};
addColors(colors);

const customFormat = format.combine(
	format.timestamp(),
	format.colorize({ all: true }),
	format.printf(({ timestamp, level, context, message, stack, ...rest }) => {
		let log = `${timestamp}|${level.toUpperCase()}`;
		if (context) {
			log = `${log}|${context}`;
		}
		if (message) {
			log = `${log}|${message}`;
		}
		if (Object.keys(rest).length) {
			log = `${log}|${JSON.stringify(rest)}`;
		}
		if (stack) {
			log = `${log}|${stack}`;
		}
		return log;
	})
);

function level() {
	return isDevelopment() ? 'debug' : 'warn';
}

/**
 *
 * @param {LoggerOptions} options
 * @returns {winston.Logger}
 */
function createLogger(options) {
	const { name, maxSize, maxFiles, datePattern, format: logFormat } = getOptions(options);
	const fileTransport = new transports.DailyRotateFile({
		dirname: `logs/${name}`,
		filename: `${name}-%DATE%-winston`,
		datePattern: datePattern,
		maxFiles: maxFiles,
		maxSize: maxSize,
		utc: true,
		extension: '.log',
	});

	const consoleTransport = new transports.Console();

	return createWinstonLogger({
		format: logFormat,
		level: level(),
		transports: isDevelopment() ? [(fileTransport, consoleTransport)] : [fileTransport],
	});
}

/**
 *
 * @param {winston.logFormat} options
 * @returns {LoggerOptions}
 */
function getOptions(options) {
	const defaultOptions = {
		level: level(),
		name: 'default',
		maxSize: null,
		maxFiles: null,
		datePattern: 'YYYYMMDD',
		format: format.combine(format.timestamp(), customFormat),
	};
	Object.assign(defaultOptions, options);

	return defaultOptions;
}

module.exports = {
	logLevel: level,
	createLogger,
};
