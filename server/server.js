const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room))
        {
            return callback('Name and room name are required');
        }

        // socket.join joins a user to a specific room.
        socket.join(params.room);
        // socket.leave(roomName) would leave the room

        users.removeUser(socket.id); // to remove the user from any other room if they joined earlier
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //io.emit becomes io.to('Room name').emit which emits events to all users in a given room
        //socket.broadcast.emit becomes socket.broadcast.to("Room Name") which emits to all users except this user jooined to the same room
        // socket.emit stays the same since we only emit to the same useer.

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined chat`));
        callback();
    });

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
        var user = users.removeUser(socket.id);

        if (user)
        {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat`))
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});