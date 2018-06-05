$(document).ready(function(){
    $.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple', res => {
        console.log(res);
        $('#body').append(res);
    })
});