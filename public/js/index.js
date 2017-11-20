var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (locationMessage) {
        var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My current location</a>');

        li.text(`${locationMessage.from}: ${formattedTime}:`);
        a.attr('href', locationMessage.url);

        li.append(a);
        jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault(); // this prevents the page from reloading when a new messagge is entered in to the html form

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
var locationButtonNormalText = locationButton.html();
var locationButtonSendingText = 'Sending location...';

locationButton.on('click', function () {
    if (!navigator.geolocation)
    {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text(locationButtonSendingText);

    navigator.geolocation.getCurrentPosition( function (position) {
        locationButton.removeAttr('disabled').text(locationButtonNormalText);

        socket.emit('createLocationMessage', {
            lattitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text(locationButtonNormalText);
        alert('Unable to fetch location');
    })
});