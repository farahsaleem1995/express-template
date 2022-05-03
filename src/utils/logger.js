const { createLogger: createWinstonLogger, transports, format } = require('winston');
const { isDevelopment } = require('./env');
const { removeFalsyProperties } = require('./helpers.utils');
require('winston-daily-rotate-file');

function level() {
	return isDevelopment() ? 'debug' : 'warn';
}

function createLogger({ name, maxSize, maxFiles, datePattern }) {
	const loggerOption = getOptions({ name, maxSize, maxFiles, datePattern });

	const fileTransport = new transports.DailyRotateFile({
		dirname: `logs/${loggerOption.name}`,
		filename: `${loggerOption.name}-%DATE%-winston`,
		datePattern: loggerOption.datePattern,
		maxFiles: loggerOption.maxFiles,
		maxSize: loggerOption.maxSize,
		utc: true,
		extension: '.log',
		format: getFileFormat(),
	});

	const consoleTransport = new transports.Console({
		format: getConsoleFormat(),
	});

	const winstonLogger = createWinstonLogger({
		level: level(),
		transports: isDevelopment() ? [fileTransport, consoleTransport] : [fileTransport],
	});

	return getLogger(name, winstonLogger);
}

function getLogger(name, winstonLogger) {
	return {
		debug: function (message) {
			winstonLogger.debug(rebuildMessage(name, message));
		},
		info: function (message) {
			winstonLogger.info(rebuildMessage(name, message));
		},
		warn: function (message) {
			winstonLogger.warn(rebuildMessage(name, message));
		},
		error: function (message) {
			winstonLogger.error(rebuildMessage(name, message));
		},
		http: function (message) {
			winstonLogger.http(rebuildMessage(name, message));
		},
	};
}

function rebuildMessage(name, message) {
	if (typeof message == 'string') {
		return `[${name}] ${message}`;
	}

	if (message.message) {
		return { ...message, message: `[${name}] ${message.message}` };
	}

	return message;
}

function getOptions(options) {
	const loggerName = options.name ?? 'default';
	const defaultOptions = {
		level: level(),
		name: loggerName,
		maxSize: null,
		maxFiles: null,
		datePattern: 'YYYYMMDD',
	};
	Object.assign(defaultOptions, removeFalsyProperties(options));

	return defaultOptions;
}

function getFileFormat() {
	return format.combine(
		format.timestamp(),
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

function getConsoleFormat() {
	return format.combine(
		format.colorize({
			all: true,
			colors: {
				error: 'red',
				warn: 'yellow',
				info: 'green',
				http: 'magenta',
				debug: 'white',
			},
		}),
		format.printf(({ message }) => message)
	);
}

module.exports = {
	level,
	createLogger,
};
