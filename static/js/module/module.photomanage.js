/**
 * @name Edwin
 * @description
 * Date: 2014/11/18
 * Time: 17:23
 *
 */

(function($){
    var _templatePhotoView = '' +
        '<div class="photo-img">' +
        '   <img src="{{photoPath}}"/>' +
        '</div>' +
        '<ul class="photo-info ui-form-body">' +
        '   <li>' +
        '       <div class="ui-form-line-desc">照片名称:</div>' +
        '       <input class="name ui-input-minimal" value="{{title}}"/></div>' +
        '   </li>'+
        '   <li>' +
        '       <div class="ui-form-line-desc">照片描述:</div>' +
        '       <textarea class="detail">{{description}} </textarea>' +
        '   </li>' +
        '</ul>'

    var modulePhoto = {
        init: function(){
            var self = this
            self.__initPhotoGroupEffect()
            self.__bindEvent()


        },
        __initPhotoGroupEffect: function(){
            $(document).find('.ui-pg1').prepend('<span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/>')
            $(document).find('.ui-pg1-static').prepend('<span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/>')
        },
        __bindEvent:function(){

            $('.op-wrap .icon').click(function(){
                $(this).parent().find('ul').show()
            })
            $('.photo-wrap img').mouseover(function(){
                $(this).parent().find('ul').hide()
            })
            $('.delete-btn').click(function(){
                var pid = $(this).attr('id')
                var dialog = self.__deleteDialog = new App.common.modules.Dialog({
                    width:300,
                    height:165,
                    showTitle:false,
                    message:'<div style="width:100%; line-height:60px; text-align: center">删除后无法恢复，确认删除吗？</div>',
                    okCallback:function(){
                        $.ajax({
                            url:'/s',
                            type:'delete',
                            data:{
                                service: 'Photo.deletePhotoCollectionPhotos',
                                idArray:'["'+pid +'"]'
                            },
                            success:function(data){
                                if(data.code==200){
                                    $('.photo-wrap[id='+pid+']').remove()
                                }
                                else{
                                    App.common.modules.smallnote('操作失败，请您稍后再试', {
                                        time:3000,
                                        pattern: 'error',
                                        top: ($(window).height() - 60) / 2
                                    })
                                }
                            }
                        })
                    },
                    cancelCallback:function(){}
                })
            })

            $('.modify-btn').click(function(){
                var id = $(this).attr('id')
                var self = this
                var container = self.__container


                var title = '照片信息'
                var dialog = self.__photoDialog = new App.common.modules.Dialog({
                    width: 752,
                    height: 390,
                    title: title,
                    message: '<div class="mod-photoinfo-wrap"  id="' + id + '"></div>',
                    okCallback: function () {
                        var pid = $('.mod-photoinfo-wrap').attr('id')
                        var name = $('.mod-photoinfo-wrap .name').val()
                        var detail = $('.mod-photoinfo-wrap textarea').val()
                        $.ajax({
                            url:'/s',
                            type:'put',
                            data:{
                                service: 'Photo.updatePhotoInfo',
                                photoId:pid,
                                title:name,
                                description:detail
                            },
                            success:function(data){
                                if(data.code==200){
                                    $('.photo-wrap[id='+pid+'] input').val(name)
                                }
                                else if(data.code!=200){
                                    App.common.modules.smallnote('操作失败，请您稍后再试', {
                                        time:3000,
                                        pattern: 'error',
                                        top: ($(window).height() - 60) / 2
                                    })
                                }
                            }
                        })

                    },
                    cancelCallback: function () {

                    }
                })
                $.ajax({
                    url: '/s',
                    type: 'get',
                    data: {
                        service: 'Photo.getPhotoBaseInfo',
                        photoId: id
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            data.data.photoPath = data.data.photoPath.replace('_X_X','_THUMBNAIL_200_200')
                            $('.mod-photoinfo-wrap').html($.trim(Mustache.render(_templatePhotoView, data.data)))
                        }
                    }
                })


            })

            $('.photo-wrap input').blur(function(){
                var photoId = $(this).parent().attr('id')
                var name = $(this).val()
                $.ajax({
                    url: '/s',
                    type: 'put',
                    data: {
                        service: 'Photo.updatePhotoInfo',
                        photoId:photoId,
                        title: name
                    },
                    success: function (data) {
                        if (data.code == 200) {
                        }
                        else if (data.code != 200) {
                            App.common.modules.smallnote('操作失败，请您稍后再试', {
                                time: 3000,
                                pattern: 'error',
                                top: ($(window).height() - 60) / 2
                            })
                        }
                    }
                })
            })

        }
    }

    $(function(){
        modulePhoto.init()
    })

})(jQuery)