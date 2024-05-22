const http = require('http');

// express app
const app = require('./app.js');

const port = process.env.PORT  || 3000;
app.set('port', port);

//http server in der express app abgebildet, deswegen als parameter
const server = http.createServer(app);

server.listen(port);