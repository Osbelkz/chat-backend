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

const messages: Array<any> = [];

const usersState = new Map();

socket.on('connection', (socketChannel) => {
    console.log('a user connected');
    usersState.set(socketChannel, {id: new Date().getTime().toString(), name: "anonym"})

    socketChannel.on("disconnect", (name: string) => {
        usersState.delete(socketChannel)
    })

    socketChannel.on("client-name-sent", (name: string) => {
        const user = usersState.get(socketChannel);
        user.name = name;
    })
    socketChannel.on("client-typing", (name: string) => {
        socketChannel.broadcast.emit("user-typing", usersState.get(socketChannel))
    })
    socketChannel.emit("init-messages-published", messages);

    socketChannel.on('client-message-sent', (message: string) => {
        if ( typeof message !== "string") {
            return
        }

        const user = usersState.get(socketChannel)

        let newMessage = {message: message, id: new Date().getTime().toString(), user: {id: "fsdjyhjsfda", name: user.name}};
        messages.push(newMessage)
        socket.emit("new-message-sent", newMessage)
        console.log(message);
    });
});

const PORT = process.env.PORT || 3008;

http.listen(PORT, () => {
    console.log('listening on *:3008');
});
