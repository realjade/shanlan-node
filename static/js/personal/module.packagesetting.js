/**
 * @name Edwin
 * @description
 * Date: 2014/11/5
 * Time: 12:00
 *
 */

(function($){
    var personalPackageSetting = {
        __container: null,

        init: function(container, options){
            var self = this
            self.__container = container
            self.__options = options

            self.__bindEvent();
        },

        __bindEvent: function(){
            var self = this
            var options = self.__options
            var container = self.__container

            container.on('click','#group-block',function(){
                var dialog = self.__associateDialog = new App.common.modules.Dialog({
                    width:1000,
                    height:600,
                    showTitle: false,
                    message: '<div class="mod-associate-wrap"></div>',
                    okCallback: function(){
                        var collactionId = dialog.find('#active').find('input[type=radio]').attr('value')
                        if(collactionId){
                            $('input[name="rePhotoCollectioinId"]', container).val(collactionId)
                            self.__reGroup(collactionId)
                        }
                    }
                })
                dialog.find('.mod-associate-wrap').groupselector({
                    userName: options.me && options.me.userName
                })
            })

        },
        __reGroup: function(collactionId){
            $.ajax({
                url: '/s',
                type: 'get',
                data:{
                    service: 'Photo.listCollectionPhotos',
                    photoCollectionId: collactionId
                },
                success: function(data){
                    if(data.code === 200){
                        data = data.data
                        $('#group-block').attr('class','group-block')
                        $('#group-block').html('')
                        $.each(data,function(idx,item){
                            if(idx > 7) return false
                            var wrapPath = App.common.modules.common.wrapPhotoPath(item.filePath)
                            $('#group-block').append('<img src="'+wrapPath.thumbnall_100+'"/>')
                        })
                    }
                }
            })
        }
    }
    $(function () {
        personalPackageSetting.init($('.mod-personal-package-setting'), window.pageConfig)
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })
})(jQuery)