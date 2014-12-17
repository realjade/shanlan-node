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

            container.on('click','.photo-wrap',function(){
                var collectionId = $(this).attr('id')
                location.href = '/personal/photosetting/'+collectionId
            })

            container.on('click','.modify-coll-btn',function(){
                var gid = $(this).parent().attr('id')
                self.__initGroupView(gid,false)
            })

            container.on('click','.upload-btn',function(){
                self.__initUploadView();

            })

            container.on('click','.newalbum-btn',function(){
                self.__initGroupView('',true)
            })

            container.on('click','.delete-coll-btn',function(){
                var gid = $(this).parent().attr('id')
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
                                service: 'Photo.removePhotoCollection',
                                photoCollectionId:gid
                            },
                            success:function(data){
                                if(data.code==200){
                                    $('.item[id='+gid+']').remove()
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

        },


        __initUploadView:function(gid){
            var self = this
            var container = self.__container
            var title = '上传新照片'
            var dialog = self.__uploadDialog = new App.common.modules.Dialog({
                width:850,
                height:440,
                showTitle:false,
                message:'<div class="mod-upload-wrap" id="uploader"></div>',
                okCallback:function(){
                    location.href='/personal/photoall/'
                }
            })
            var upload = new App.common.modules.upload($("#uploader"), {
                url: '/upload'
            })

            upload.setUrl('/opf/upload/uploadPhotos?collectionId='+gid)

        },

        __initGroupView: function(gid,isNew){
            var self = this
            var container = self.__container
            var title = '相册信息'
            var dialog = self.__groupDialog = new App.common.modules.Dialog({
                width:850,
                height:505,
                title: title,
                message:'<div class="mod-group-wrap" id="'+gid+'"></div>',
                okCallback:function(){
                    var gid = $('.mod-group-wrap').attr('id')
                    var name = $('.mod-group-wrap .name').val()
                    var detail = $('.mod-group-wrap textarea').val()
                    $.ajax({
                        url:'/s',
                        type:'post',
                        data:{
                            service: 'Photo.createOrUpdatePhotoCollection',
                            photoCollectionId:gid,
                            name:name,
                            description:detail
                        },
                        success:function(data){
                            if(data.code==200 && isNew){
                                location.href = '/personal/photosetting/'+data.data.id
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
                cancelCallback:function(){

                }
            })
            if(gid){
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
            else{
                $('.mod-group-wrap').html($.trim(Mustache.render(_templateGroupView,JSON.parse('{}'))))
            }

        }

    }

    $(function(){
        photoManage.init($('.mod-personal-photo'),pageConfig)
    })

})(jQuery)