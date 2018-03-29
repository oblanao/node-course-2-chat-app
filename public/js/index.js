var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);
})

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var anchor = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    anchor.attr('href', message.url);
    li.append(anchor);
    $('#messages').append(li);
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