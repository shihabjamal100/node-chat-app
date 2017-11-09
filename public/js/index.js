var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('newMessage', {
        from: 'Shihab',
        text: 'Dinner at 7.'
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});