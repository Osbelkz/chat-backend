// import express from 'express';
// import http from 'http';
// import socketIo from 'socket.io';
//
//
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server)
//
// app.get('/', (req, res) => {
//     res.send("hello my server");
// });
//
// io.on('connection', (socket) => {
//     console.log('a user connected');
// });
//
// server.listen(3009, () => {
//     console.log('listening on *:3009');
// });
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.send("hello from server");
});
io.on('connection', (socket) => {
    console.log('a user connected');
});
const PORT = process.env.PORT || 3009;
http.listen(PORT, () => {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map