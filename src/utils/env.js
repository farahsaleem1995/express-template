function env() {
	return process.env.NODE_ENV || 'development';
}

function isDevelopment() {
	const env = process.env.NODE_ENV || 'development';
	return (isDevelopment = env === 'development');
}

function isProduction() {
	const env = process.env.NODE_ENV || 'development';
	return (isDevelopment = env === 'production');
}

function isStaging() {
	const env = process.env.NODE_ENV || 'development';
	return (isDevelopment = env === 'staging');
}

module.exports = {
	env,
	isDevelopment,
	isProduction,
	isStaging,
};
