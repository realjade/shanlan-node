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
        '   <div class="item" id="{{id}}">' +
        '       <div class="photo-wrap ui-pg1">' +
        '           <span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/>' +
        '           <img src="{{coverImg}}"/>' +
//        '         <div class="bar">' +
//        '             <div class="name">{{name}}</div>' +
//        '             <div class="delete-btn" id="{{id}}"/>' +
//        '         </div>' +
        '       </div>' +
        '       <div class="name">《{{name}}》</div>' +
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

        },

        __bindEvent: function(){
            var self = this
            var container = self.__container
            var options = self.__options

            container.on('click','.header .tag',function(){
                var pTag = $('.tag.active').attr('id')
                var cTag = $(this).attr('id')
                if(pTag == cTag) return
                $('.tag').removeClass('active')
                $(this).addClass('active')

                if(cTag == 'album'){
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
                }
                else if(cTag == 'photo'){

                }

            })

        }


    }

    $(function(){
        photoManage.init($('.mod-personal-photo'),pageConfig)
    })

})(jQuery)