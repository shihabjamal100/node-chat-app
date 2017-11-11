const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    // ====== socket.emit only emits the event only to this one socket.=======
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat'));

    socket.on('createMessage', (newMeessage, callBack) => {
        console.log('createMessage', newMeessage);

        // =========== io.emit emits the event to all the clients connected inluding this socket=========
        io.emit('newMessage', generateMessage(newMeessage.from, newMeessage.text));
        callBack();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lattitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});