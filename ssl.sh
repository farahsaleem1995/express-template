mkdir -p ssl
cd ssl
# generate private key
openssl genrsa -out key.pem 2048
# generate certificate signing request
openssl req -new -key key.pem -out csr.pem
# generate ssl certifacte
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem