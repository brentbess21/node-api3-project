// require your server and launch it

const server = require('./api/server');

const port = 5000

server.listen(port, ()=> {
    console.log(`Listening on localhost:${port}`);
});