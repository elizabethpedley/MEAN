$(document).ready(function (){
    var socket = io(); //1

    $('.change').click(function(){
        var col = $(this).text();
        socket.emit('change', {color: col});
    });
    socket.on('updated', function(data){
        $('body').removeClass();
        $('body').addClass(data.color);
    });
 })