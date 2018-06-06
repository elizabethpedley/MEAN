$(document).ready(function (){
    var socket = io(); //1

    $('#push').click(function(){
        socket.emit('push', {msg: 'give me updated counter'});
    });
    $('#reset').click(function(){
        socket.emit('reset', {msg: 'reset counter'})
    })
    socket.on('updated', function(data){
        $('h1 span').html(data.number);
    });
 })