/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-30
 * Time: 下午5:48
 *
 */
$(function(){
    var msgPanel = $('#message');

    var socket = io();

    socket.on('connect', function(){
        socket.emit('join', prompt('请输入你的姓名'));
    });

    socket.on('join', function(msg){
        addMessage(msg);
    });

    socket.on('announcement', function(msg){
        addMessage(msg);
    });
    socket.on('text', function(msg){
        addMessage(msg);
    });
    var input = $('input');
    $('form').submit(function(){
        socket.emit('text', input.val());
        addMessage(input.val());
        return false;
    });

    function addMessage(msg){
        $('<li></li>').text(msg).appendTo(msgPanel);
    }

});