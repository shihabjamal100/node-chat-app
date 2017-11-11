var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}:  ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (locationMessage) {
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My current location</a>');

        li.text(`${locationMessage.from}: `);
        a.attr('href', locationMessage.url);

        li.append(a);
        jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault(); // this prevents the page from reloading when a new messagge is entered in to the html form

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation)
    {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition( function (position) {
        socket.emit('createLocationMessage', {
            lattitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location');
    })
});