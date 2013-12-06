$(document).ready(function() {
    var socket = io.connect('http://localhost:3000');
 
    socket.on('fetch notifications', function (data) {
        //function for object conversion to array of object
        var array = $.map(data.message, function(value, index) {
            return [value];
        });
        var $counter, val, html = '<li style="background-color: lightgrey;"><a href="#">See All</a></li>';
        $counter = $('.notification-counter');
        /*val = parseInt($counter.text());
        val++;*/
        val = array[0]['notification'].length
        $counter.css({
            opacity: 0
        }).text(val).css({
            top: '-10px'
        }).animate({
            top: '-2px',
            opacity: 1
        });
        for (var i = 0; i <  val; i++) {
            html = html + '<li> <a href="#">' + array[0]['notification'][i]['activity_type'] + '</a> </li>'
        };
        $('#drop-notification').html(html);
    });

    $('body').on('click', '#sysNotify', function (e) {
        e.preventDefault();
        console.log('i am clicked');
        socket.emit('new notification', { message: 'new notification' });
    });
    
    var userId = document.getElementById('user_id').value;
    socket.emit('notification', { message: userId });
    
});