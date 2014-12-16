/**
 * @name Edwin
 * @description
 * Date: 2014/11/12
 * Time: 21:36
 *
 */

(function($){

    var _templateGroupView = '' +
        '<ul class="ui-form-body">' +
        '   <li>' +
        '       <div class="ui-form-line-desc">相册名称:</div>' +
        '       <input class="name ui-input-minimal" value="{{name}}"/></div>' +
        '       <div class="ui-form-line-note">*为了显示效果，建议名称在10个字以内</div>' +
        '   </li>' +
        '   <li>' +
        '       <div class="ui-form-line-desc">相册类型:</div>' +
        '       <div class="type-wrap">' +
        '       </div>' +
        '   </li>' +
        '   <li>' +
        '       <div class="ui-form-line-desc">相册风格:</div>' +
        '       <div class="style-wrap">' +
        '       </div>' +
        '   </li>' +
        '   <li>' +
        '       <div class="ui-form-line-desc">相册描述:</div>' +
        '       <textarea class="detail">{{description}} </textarea>' +
        '   </li>' +
        '</ul>'

    var photoManage = {
        __container: null,

        init: function(container,options){
            var self = this
            self.__container = container
            self.__options = options
            self.__bindEvent()

        },

        __bindEvent: function(){
            var self = this
            var container = self.__container

            container.on('click','.header .tag',function(){
                var pTag = $('.tag.active').attr('id')
                var cTag = $(this).attr('id')
                if(pTag == cTag) return
                $('.tag').removeClass('active')
                $(this).addClass('active')

                if(cTag == 'album'){

                }
                else if(cTag == 'photo'){

                }

            })

            container.on('click','.photo-wrap',function(){
                var collectionId = $(this).attr('id')
                location.href = '/personal/photosetting/'+collectionId
            })

            container.on('click','.modify-btn',function(){
                var gid = $(this).attr('id')
                self.__initGroupView(gid)

            })

        },

        __initGroupView: function(gid){
            var self = this
            var container = self.__container
            var title = '修改相册信息'
            var dialog = self.__groupDialog = new App.common.modules.Dialog({
                width:850,
                height:505,
                title: title,
                message:'<div class="mod-group-wrap"></div>',
                okCallback:function(){

                },
                cancelCallback:function(){

                }
            })
            $.ajax({
                url:'/s',
                type:'get',
                data:{
                    service: 'Photo.getPhotoCollection',
                    photoCollectionId: gid
                },
                success:function(data){
                    if(data.code==200){
                        $('.mod-group-wrap').html($.trim(Mustache.render(_templateGroupView,data.data)))

                    }
                }
            })
        }

    }

    $(function(){
        photoManage.init($('.mod-personal-photo'),pageConfig)
    })

})(jQuery)