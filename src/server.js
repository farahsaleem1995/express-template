const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = require('./app');

const HTTP_PORT = process.env.HTTP_PORT || 8000;
const HTTPS_PORT = process.env.HTTPS_PORT || 8001;
const SSL_KEY = process.env.SSL_KEY || path.join(__dirname, '..', 'key.pem');
const SSL_CERT = process.env.SSL_CERT || path.join(__dirname, '..', 'cert.pem');

const httpServer = http.createServer(app);

const httpsServer = https.createServer(
	{
		key: fs.readFileSync(SSL_KEY),
		cert: fs.readFileSync(SSL_CERT),
	},
	app
);

httpServer.listen(HTTP_PORT, () => {
	console.info(`HTTP: listening on port ${HTTP_PORT}...`);
});

httpsServer.listen(HTTPS_PORT, () => {
	console.info(`HTTPS: listening on port ${HTTPS_PORT}...`);
});
