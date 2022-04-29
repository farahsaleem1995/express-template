const http = require('http');
const https = require('https');
const fs = require('fs');

const app = require('./app');
const { SSL_KEY, SSL_CERT, HTTP_PORT, HTTPS_PORT } = require('./config');

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
