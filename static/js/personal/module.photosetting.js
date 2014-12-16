/**
 * @name Edwin
 * @description
 * Date: 2014/11/5
 * Time: 12:00
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


    var personalPhotoSetting = {
        __container: null,

        init: function(container){
            var self = this
            self.__container = container

            self.__bindEvent();
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container
            var gid = $('.mod-personal-photo-setting').attr('id')

            container.on('click','.modify-coll-btn',function(){
                self.__initCollInfoView(gid)

            })

            container.on('click','.upload-btn',function(){
                self.__initUploadView(gid);

            })

            container.on('click','.setcoverpath-btn',function(){
                var filePath = $(this).attr('filePath')
                $.ajax({
                    url:'/s',
                    type:'put',
                    data:{
                        service: 'Photo.updatePhotoCollectionCover',
                        photoCollectionId: gid,
                        coverPath:filePath
                    },
                    success:function(data){
                        if(data.code==200){
                            var coverBox = $('.cover')
                            coverBox.empty()
                            coverBox.append(document.createElement('img'))
                            coverBox.find('img').attr('src',filePath.replace('_X_X','_THUMBNAIL_200_200'))
                            App.common.modules.smallnote('更改封面成功',{
                                time:3000,
                                top: ($(window).height() - 60) / 2
                            })
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
            })
            container.on('click','.remove-btn',function(){
                var pid = $(this).attr('id')
                $.ajax({
                    url:'/s',
                    type:'delete',
                    data:{
                        service: 'Photo.removePhotoCollectionPhotos',
                        photoCollectionId: gid,
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
            })

            container.on('click','.delete-btn',function(){
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
                                photoCollectionId: gid,
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
                    cancelCallback:function(){

                    }
                })

            })

            container.on('click','.multimanage-btn',function(){
                $('.buttons-box').css('top','-50px')
            })

            container.on('click','.finish-btn',function(){
                $('.buttons-box').css('top','0px')
            })


        },

        __initUploadView:function(gid){
            var self = this
            var container = self.__container
            var title = '上传新照片'
            var dialog = self.__uploadDialog = new App.common.modules.Dialog({
                width:850,
                height:505,
                title: title,
                message:'<div class="mod-upload-wrap" id="uploader"></div>',
                okCallback:function(){
                    location.href='/personal/photosetting/'+gid
                }
            })
            $("#uploader").pluploadQueue({
                // General settings
                runtimes : 'html5,flash,html4',
                url : '/opf/upload/uploadPhotos?collectionId='+gid,
                //chunk_size: '1mb',
                rename : true,
                dragdrop: true,

                filters : {
                    // Maximum file size
                    max_file_size : '20mb',
                    // Specify what files to browse for
                    mime_types: [
                        {title : "Image files", extensions : "jpg,gif,png"},
                        {title : "Zip files", extensions : "zip"}
                    ]
                },

                flash_swf_url : '//static.mgcheng.com/static/js/libs/jquery/plupload/js/Moxie.swf'
            });
        },

        __initCollInfoView: function(gid){
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
    $(function () {
        personalPhotoSetting.init($('.mod-personal-photo-setting'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })
})(jQuery)