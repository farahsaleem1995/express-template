const { createLogger: createWinstonLogger, transports, format, addColors } = require('winston');
const { isDevelopment } = require('./env');
const { removeFalsyProperties } = require('./helpers.utils');
require('winston-daily-rotate-file');

addColors({
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
});

function level() {
	return isDevelopment() ? 'debug' : 'warn';
}

function createLogger({ name, maxSize, maxFiles, datePattern, format }) {
	const loggerOption = getOptions({ name, maxSize, maxFiles, datePattern, format });

	const fileTransport = new transports.DailyRotateFile({
		dirname: `logs/${loggerOption.name}`,
		filename: `${loggerOption.name}-%DATE%-winston`,
		datePattern: loggerOption.datePattern,
		maxFiles: loggerOption.maxFiles,
		maxSize: loggerOption.maxSize,
		utc: true,
		extension: '.log',
	});

	const consoleTransport = new transports.Console();

	const winstonLogger = createWinstonLogger({
		format: loggerOption.format,
		level: level(),
		transports: isDevelopment() ? [fileTransport, consoleTransport] : [fileTransport],
	});

	return getLogger(winstonLogger);
}

function getLogger(winstonLogger) {
	return {
		debug: function (message) {
			winstonLogger.debug(message);
		},
		info: function (message) {
			winstonLogger.info(message);
		},
		warn: function (message) {
			winstonLogger.warn(message);
		},
		error: function (message) {
			winstonLogger.error(message);
		},
		http: function (message) {
			winstonLogger.http(message);
		},
	};
}

function getOptions(options) {
	const defaultOptions = {
		level: level(),
		name: 'default',
		maxSize: null,
		maxFiles: null,
		datePattern: 'YYYYMMDD',
		format: format.combine(format.timestamp(), getFormat()),
	};
	Object.assign(defaultOptions, removeFalsyProperties(options));

	return defaultOptions;
}

function getFormat() {
	return format.combine(
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
}

module.exports = {
	level,
	createLogger,
};
