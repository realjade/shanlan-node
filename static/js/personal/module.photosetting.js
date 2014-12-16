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

    var _idArray = ''

    var personalPhotoSetting = {
        __container: null,

        init: function(container){
            var self = this
            self.__container = container

            self.__bindEvent();

            if($('.mod-personal-photo-setting').attr('id') == ''){
                //$('.modify-coll-btn').trigger('click')
            }
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

            container.on('click','.multiremove-btn',function(){
                if(_idArray == ''){
                    App.common.modules.smallnote('没有选择照片', {
                        time:1500,
                        pattern: 'error',
                        top: ($(window).height() - 60) / 2
                    })
                }
                else{
                    _idArray = _idArray.substr(0,_idArray.length-1)
                    $.ajax({
                        url:'/s',
                        type:'delete',
                        data:{
                            service: 'Photo.removePhotoCollectionPhotos',
                            photoCollectionId: gid,
                            idArray:'['+_idArray +']'
                        },
                        success:function(data){
                            if(data.code==200){
                                $('.photo-wrap[flag="t"]').remove()
                                _idArray = ''
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
                }

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
                    cancelCallback:function(){}
                })
            })

            container.on('click','.multidelete-btn',function(){
                if(_idArray == ''){
                    App.common.modules.smallnote('没有选择照片', {
                        time:1500,
                        pattern: 'error',
                        top: ($(window).height() - 60) / 2
                    })
                }
                else {
                    _idArray = _idArray.substr(0, _idArray.length - 1)
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
                                    idArray:'['+_idArray +']'
                                },
                                success:function(data){
                                    if(data.code==200){
                                        $('.photo-wrap[flag="t"]').remove()
                                        _idArray = ''
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
                }
            })

            container.on('click','.multimanage-btn',function(){
                $('.buttons-box').css('top','-50px')
                $('.select-box').show()
                self.__bindSelectEvent()
            })

            container.on('click','.finish-btn',function(){
                $('.buttons-box').css('top','0px')
                $('.select-box').hide()
                $('.select-box').attr('flag','f')
                $('.select-box').find('.select-box').css({
                    'background-color':'#fff',
                    'border':'1px solid #bbb'
                })
                _idArray = ''
                self.__unbindSelectEvent()
            })

            container.on('click','.op-wrap .icon',function(){
                $(this).parent().find('ul').show()
            })
            container.on('mouseout','.photo-wrap img',function(){
                $(this).parent().find('ul').hide()
            })

            container.on('click','.selectall-box',function(){
                if($(this).attr('flag') == 'f'){
                    $(this).attr('flag','t')
                    $(this).find('.arrow-box').css('background-color','#66c2ff')
                    _idArray = ''
                    $('.photo-wrap').each(function(){
                        var photoWrap = $(this)
                        var id = photoWrap.attr('id')
                        var idStr = '"'+id + '",'
                        photoWrap.attr('flag','t')
                        photoWrap.find('.select-box').css({
                            'background-color':'#66C2FF',
                            'border':'1px solid #66C2FF'
                        })
                        _idArray += idStr
                    })
                }
                else{
                    $(this).attr('flag','f')
                    $(this).find('.arrow-box').css('background-color','#fff')
                    _idArray = ''
                    $('.photo-wrap').each(function(){
                        var photoWrap = $(this)
                        photoWrap.attr('flag','f')
                        photoWrap.find('.select-box').css({
                            'background-color':'#fff',
                            'border':'1px solid #bbb'
                        })
                    })
                }
            })

            $('.top-wrap .name').blur(function() {
                var gid = $('.mod-personal-photo-setting').attr('id')
                var name = $(this).val()
                $.ajax({
                    url: '/s',
                    type: 'post',
                    data: {
                        service: 'Photo.createOrUpdatePhotoCollection',
                        photoCollectionId: gid,
                        name: name
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


        },
        __unbindSelectEvent:function() {
            var self = this
            var container = self.__container
            container.off('click','.photo-wrap img')
            container.off('mouseover mouseout','.photo-wrap')
        },

        __bindSelectEvent:function(){
            var self = this
            var container = self.__container

            container.on('mouseover','.photo-wrap',function(){
                $(this).css('border','2px solid #66C2FF')
            })

            container.on('mouseout','.photo-wrap',function(){
                $(this).css('border','2px solid #dcf1f5')
            })

            container.on('click','.photo-wrap img',function(){
                var photoWrap = $(this).parent()
                var id = photoWrap.attr('id')
                var idStr = '"'+id + '",'
                if(photoWrap.attr('flag') == 'f'){
                    photoWrap.attr('flag','t')
                    photoWrap.find('.select-box').css({
                        'background-color':'#66C2FF',
                        'border':'1px solid #66C2FF'
                    })
                    _idArray += idStr
                }
                else{
                    photoWrap.attr('flag','f')
                    photoWrap.find('.select-box').css({
                        'background-color':'#fff',
                        'border':'1px solid #bbb'
                    })
                    _idArray = _idArray.replace(idStr,'')
                }
            })
        },

        __initUploadView:function(gid){
            var self = this
            var container = self.__container
            var title = '上传新照片'
            var dialog = self.__uploadDialog = new App.common.modules.Dialog({
                width:850,
                height:505,
                showTitle:false,
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
            var title = '相册信息'
            var dialog = self.__groupDialog = new App.common.modules.Dialog({
                width:850,
                height:505,
                title: title,
                message:'<div class="mod-group-wrap"  id="'+gid+'"></div>',
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
                            if(data.code==200){
                                $('.top-wrap .name').val(name)
                                $('.top-wrap .description').val(detail)
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
                $('.mod-group-wrap').html($.trim(_templateGroupView))
            }

        }

    }
    $(function () {
        personalPhotoSetting.init($('.mod-personal-photo-setting'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })
})(jQuery)