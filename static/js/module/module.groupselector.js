/**
 * @name Edwin
 * @description
 * Date: 2014/11/7
 * Time: 21:21
 *
 */

$(function(){
    var _template = ''+
        '<div class="photogroup-wrap">'+
        '   <div class="group-item-box">'+
        '       <div class="group-cover">'+
        '           <img class="group-cover-img" src="//static.jspass.com/static/css/profile/images/trade-1-0.png">'+
        '           </img>'+
        '       </div>'+
        '       <div class="group-name"> 作品集名称'+
        '       </div>'+
        '       <input type="checkbox" class="group-checkbox"/>'+
        '   </div>'+
        '</div>'+
        ''+
        ''+
        '</div>'

    $.fn.groupselector = function(o){
        var self = $(this)
        init()
        function init(){
            self.options = {

            }
            $.extend(self.options,o)
            show()
        }

        function show(){
            self.html($.trim(Mustache.render(_template,{})))
            self.show()
            bindEvent()
        }

        function bindEvent(){
            self.find('.cancel').click(function(){
            })
            self.find('.confirm').click(function(){
            })
        }
    }



})