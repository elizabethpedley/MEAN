$(document).ready(function (){
    var socket = io(); 
    var user = prompt("Please enter your username");
    console.log(user);

    $('form').submit(function(){
        var msg = $('#input').val();
        socket.emit('chat', {user: user, msg: msg});
        $('#input').val('');
        return false
    });
    socket.on('updated', function(data){
        $('#chat').append(`<p>${data.user}: ${data.msg}</p>`)
    });
    socket.on('initial', function(data){
        console.log(data.log)
        for(var i in data.log)
        $('#chat').append(`<p>${data.log[i][0]}: ${data.log[i][1]}</p>`)
    });
 })