$(document).ready(function (){
    var socket = io(); //1

    $('#submit').click(function(){
        console.log('in submit')
        socket.emit('submit', {name:$('#name').val(),
                            location: $('#location').val(),
                            lang: $('#lang').val(),
                            comment: $('#comment').val()});
        
        $('#name').val(''),
        $('#location').val(''),
        $('#lang').val(''),
        $('#comment').val('')
    });
    socket.on('updated', function(data){
        $('#message').html('You emmited the following information to the server '+ data);
    });
    socket.on('number', function(data){
        $('#message').append('<br>Your lucky number emmited by the server is ' + data.number)
    });
 })