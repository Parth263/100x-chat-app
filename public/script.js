$(function () {
  var socket = io();

  // Prompt for entering name
  var userName = prompt('Please enter your name:');
  if (!userName || userName.trim() === '') {
    userName = 'Anonymous';
  }

  $('#input').focus();

  $('form').submit(function () {
    var message = $('#input').val();
    if (message.trim() !== '') {
      socket.emit('chat message', { userName, message });
      $('#input').val('').focus();
    }
    return false;
  });

  socket.on('chat message', function (data) {
    var messageElement = $('<div class="message">')
      .text(`${data.userName}: ${data.message}`)
      .appendTo($('#messages'));

    // Scroll to the bottom of the messages
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  });
});
