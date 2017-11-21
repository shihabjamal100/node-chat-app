var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
;
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
    {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);

    scrollToBottom();
});

socket.on('newLocationMessage', function (locationMessage) {
        var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            url: locationMessage.url,
            from: locationMessage.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);

        scrollToBottom();
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