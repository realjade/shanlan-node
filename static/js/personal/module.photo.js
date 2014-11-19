/**
 * @name Edwin
 * @description
 * Date: 2014/11/12
 * Time: 21:36
 *
 */

(function($){
    var _templateGroupItem ='' +
        '<div class="block-g">' +
        '   <div class="title"> 自建作品集 </div>' +
        '{{#data}}' +
        '   <div class="item" >' +
        '       <div class="photo-wrap ui-pg1" id="{{id}}">' +
        '           <img src="{{coverImg}}"/>' +
        '           <span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/>' +
        '       </div>' +
        '       <a class="name" id="{{id}}">《{{name}}》</a>' +
        '   </div>' +
        '{{/data}}' +
        '</div>'

    var _templateGroupView = '' +
        '<ul class="group-view-wrap">' +
        '   <li>' +
        '       <div class="key">名称:</div><input class="name ui-input-minimal">{{name}}</div>' +
        '   </li>' +
        '   <li>' +
        '       <div class="key">类型:</div>' +
        '       <div class="type-wrap">' +
        '       </div>' +
        '   </li>' +
        '   <li>' +
        '       <div class="key">风格:</div>' +
        '       <div class="style-wrap">' +
        '       </div>' +
        '   </li>' +
        '   <li>' +
        '       <div class="key">描述:</div>' +
        '       <textarea class="detail"> </textarea>' +
        '   </li>' +
        '   <li>' +
        '       <div class="key">照片:</div>' +
        '       <div class="photo-wrap">' +
        '           <button class="button button-flat-primary" id="upload-new-btn">上传照片</button>' +
        '           <button class="button button-flat-primary" id="gallery-btn">照片库</button>' +
        '           <div class="count">总数: {{photoCount}} 张</div>' +
        '           <div class="box">' +
        '           </div>' +
        '       </div>' +
        '   </li>' +
        '</div>'

    var _templatePhotoBox = '' +
        '<div class="wrap">' +
        '{{#data}}' +
        '   <div class="item" id="{{id}}">' +
        '       <img src="{{filePath}}"/>' +
        '       <div class="delete-btn"/>' +
        '   </div>' +
        '{{/data}}' +
        '</div>'

    var photoManage = {
        __container: null,

        init: function(container,options){
            var self = this
            self.__container = container
            self.__options = options
            self.__bindEvent()
            self.__initGroupBody()

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
                    self.__initGroupBody()
                }
                else if(cTag == 'photo'){

                }

            })

            container.on('click','.photo-wrap.ui-pg1',function(){
                var gid = $(this).attr('id')
                self.__initGroupView(gid)

            })

            container.on('click','#newalbum-btn',function(){
                self.__initGroupView()
            })



        },

        __initGroupBody: function(){
            var self = this
            var options = self.__options
            $.ajax({
                url: '/s',
                type: 'get',
                data:{
                    service: 'Photo.getPhotoCollections',
                    userName: options.me.userName
                },
                success: function(data){
                    if(data.code === 200){
                        $.each(data.data,function(idx,item){
                            item.coverImg = App.common.modules.common.wrapPhotoPath(item.photoDTOList[0].filePath).thumbnall_600
                        })
                        $('.body').html($.trim(Mustache.render(_templateGroupItem,data)))
                    }
                }
            })
        },

        __initGroupView: function(gid){
            var self = this
            var container = self.__container
            var title = '新建作品集'
            if(gid) title = '修改作品集信息'
            var dialog = self.__groupDialog = new App.common.modules.Dialog({
                width:1000,
                height:700,
                title: title,
                message:'<div class="mod-group-wrap"></div>',
                okCallback:function(){

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
                            $('.mod-group-wrap').html($.trim(Mustache.render(_templateGroupView,data)))
                        }
                    }
                })
                $.ajax({
                    url:'/s',
                    type:'get',
                    data:{
                        service: 'Photo.getPhotos',
                        photoCollectionId: gid
                    },
                    success:function(data){
                        if(data.code==200){
                            $.each(data.data,function(idx,item){
                                item.filePath = App.common.modules.common.wrapPhotoPath(item.filePath).thumbnall_100
                            })
                            $('.mod-group-wrap .box').html($.trim(Mustache.render(_templatePhotoBox,data)))
                        }
                    }
                })
            }
            else{
                $('.mod-group-wrap').html($.trim(Mustache.render(_templateGroupView)))
            }

            dialog.find('#gallery-btn').click(function(){
                var subDialog = self.__galleryDialog = new App.common.modules.Dialog({
                    width:900,
                    height:600,
                    title: title,
                    message:'<div class="mod-gallery-wrap"></div>',
                    okCallback:function(){

                    },
                    cancelCallback:function(){

                    }
                })
            })

        }


    }

    $(function(){
        photoManage.init($('.mod-personal-photo'),pageConfig)
    })

})(jQuery)