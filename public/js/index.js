var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var template = $('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    $('#messages').append(html);
})

socket.on('newLocationMessage', function(message) {
    var template = $('#locationMessage-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
})

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});
function revertButton() {
    var locationButton = $('#send-location');
    locationButton.prop('disabled', false);
    locationButton.text('Send location');
}
var locationButton = $('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Navigator not available');
    }
    locationButton.text('Sending location..');
    locationButton.prop('disabled', true);

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        revertButton();
    }, function() {
        alert('Unable to fetch location.');
        revertButton();
    }, {timeout: 4000})
})