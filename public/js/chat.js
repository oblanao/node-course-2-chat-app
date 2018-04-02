function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('div.message:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

var socket = io();

socket.on('connect', function() {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error.');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append(`<li>${user}</li>`);
    });

    $('#users').html(ol);

})

socket.on('newMessage', function(message) {
    var template = $('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
})

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message');

    socket.emit('createMessage', {
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