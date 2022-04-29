const path = require('path');
const fs = require('fs');
const process = require('process');
const dotenv = require('dotenv');

const defaultPath = path.resolve(__dirname, '..', '..', '.env');

const env = process.env.Node_ENV ?? '';
const envPath = path.resolve(__dirname, '..', '..', `${env}.env`);

const fileExists = fs.existsSync(envPath);
if (fileExists) {
	dotenv.config({ path: envPath });
} else {
	dotenv.config({ path: defaultPath });
}

module.exports = {
	HTTP_PORT: process.env.HTTP_PORT,
	HTTPS_PORT: process.env.HTTPS_PORT,
	SSL_KEY: process.env.SSL_KEY,
	SSL_CERT: process.env.SSL_CERT,
};
