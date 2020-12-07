var app = require('express')();
var http = require('http').createServer(app);
const socket = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});


app.get('/', (req, res) => {
    res.send("hello from server");
});

const messages = [
    {message: "Hello Di", id: "23425w", user: {id: "asdfasd", name: "Os"}},
    {message: "Hello os", id: "23425wsdf", user: {id: "fsdsfda", name: "Di"}},
];

socket.on('connection', (socketChannel) => {
    console.log('a user connected');

    socketChannel.emit("init-messages-published", messages);

    socketChannel.on('client-message-sent', (message: string) => {
        messages.push({message: "Hello os", id: "23425wsdf", user: {id: "fsdsfda", name: "Di"}})
        console.log(message);
    });
});

const PORT = process.env.PORT || 3008;

http.listen(PORT, () => {
    console.log('listening on *:3008');
});
