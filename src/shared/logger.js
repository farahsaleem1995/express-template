const { createLogger: createWinstonLogger, transports, format } = require('winston');
const winston = require('winston');
require('winston-daily-rotate-file');

/**
 *
 * @typedef {Object} LoggerOptions
 * @property {('fatal'|'error'|'warn'|'info'|'debug'|'trace')} level Log level.
 * @property {String} name A string used to construct log path.
 * @property {Number} maxSize Maximum size of the file after which it will rotate.
 * @property {Number} maxFiles Maximum number of logs to keep.
 * @property {String} datePattern A string representing the moment.js date format.
 * @property {winston.Logform.Format} format Log message format.
 */

const customFormat = format.printf(({ timestamp, level, context, message, stack, ...rest }) => {
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
});

/**
 *
 * @param {LoggerOptions} options
 * @returns {winston.Logger}
 */
function createLogger(options) {
	const { level, name, maxSize, maxFiles, datePattern, format: logFormat } = getOptions(options);
	const transport = new transports.DailyRotateFile({
		dirname: `logs/${name}`,
		filename: `${name}-%DATE%-winston`,
		datePattern: datePattern,
		maxFiles: maxFiles,
		maxSize: maxSize,
		utc: true,
		extension: '.log',
	});

	return createWinstonLogger({
		format: logFormat,
		level: level,
		transports: [transport],
	});
}

/**
 *
 * @param {winston.logFormat} options
 * @returns {LoggerOptions}
 */
function getOptions(options) {
	const defaultOptions = {
		level: 'info',
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
	createLogger,
};
