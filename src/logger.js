const morgan = require('morgan');
const rfs = require('rotating-file-stream');

function pad(num) {
	return (num > 9 ? '' : '0') + num;
}

function generator(time, index) {
	if (!time) return 'file.log';

	var month = time.getFullYear() + '' + pad(time.getMonth() + 1);
	var day = pad(time.getDate());
	var hour = pad(time.getHours());
	var minute = pad(time.getMinutes());

	return `${month}${day}-${hour}${minute}-${index}-file.log`;
}

const stream = rfs.createStream(generator, {
	size: '100M',
	interval: '1d',
	maxFiles: 5,
	encoding: 'utf-8',
	path: 'logs',
});

function logger(directory = null) {
	const stream = rfs.createStream(generator, {
		size: '100M',
		interval: '1d',
		maxFiles: 5,
		encoding: 'utf-8',
		path: directory ? `logs/${directory}` : 'logs',
	});

	return function (req, res, next) {
		morgan('combined', { stream })(req, res, next);
	};
}

module.exports = logger;
