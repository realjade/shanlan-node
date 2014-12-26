/**
 * @name Edwin
 * @description
 * Date: 2014/11/7
 * Time: 21:21
 *
 */

$(function(){
    var _templateItem = '<div class="photogroup-wrap">'+
        '{{#data}}'+
        '<div class="group-item-box">'+
        '    <div class="group-cover">'+
        '        <img class="group-cover-img" src="{{coverImg}}">'+
        '        </img>'+
        '    </div>'+
        '    <div class="group-name"> {{name}}'+
        '    </div>'+
        '    <input type="radio" name="group" value="{{id}}"/>'+
        '</div>'+
        '{{/data}}'+
        '</div>'


    $.fn.groupselector = function(o){
        var self = $(this)
        init()

        function init(){
            self.options = {

            }
            $.extend(self.options,o)

            $.ajax({
                url: '/s',
                type: 'get',
                data:{
                    service: 'Photo.listPhotoCollections',
                    userName: self.options.userName
                },
                success: function(data){
                    if(data.code === 200){
                        $.each(data.data,function(idx,item){
                            item.coverImg = App.common.modules.common.wrapPhotoPath(item.photoDTOList[0].filePath).thumbnall_100
                        })
                        self.html($.trim(Mustache.render(_templateItem,data)))
                        self.show()
                    }
                }
            })

            bindEvent()


        }

        function bindEvent(){
            self.on('click','.group-item-box',function(){
                $('.photogroup-wrap #active').removeAttr('id');
                $('input[type=radio]').attr('checked',false)
                $(this).attr('id','active')
                $(this).find('input[type=radio]').attr('checked',true)
            })
        }
    }



})