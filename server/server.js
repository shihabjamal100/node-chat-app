const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    // ====== socket.emit only emits the event only to this one socket.=======
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined chat',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newMeessage) => {
        console.log('createMessage', newMeessage);

        // =========== io.emit emits the event to all the clients connected inluding this socket=========
        /* io.emit('newMessage', {
            from: newMeessage.from,
            text: newMeessage.text,
            createdAt: new Date().getTime()
        }); */

        // ========== socket.broadcast.emit on the other hand emits the event to all the other users except this socket========
        /* socket.broadcast.emit('newMessage', {
            from: newMeessage.from,
            text: newMeessage.text,
            createdAt: new Date().getTime()
        }); */
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});