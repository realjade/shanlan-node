/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-23
 * Time: 下午9:41
 *
 */
(function ($) {
    'use strict'
    var profileIndex = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container

            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

            container.on('click', '.photo-group', function () {
                self.__initImageView($(this).data('id'), $(this).data('name'))
            })
        },

        __initImageView: function (gid, name) {
            var self = this

            $.ajax({
                url: '/s',
                type: 'get',
                data:{
                    service: 'Photo.getPhotos',
                    photoCollectionId: gid
                },
                success: function(data){
                    if(data.code === 200){
                        var data = data.data
                        $.each(data, function(idx, item){
                            var wrapPath = App.common.modules.common.wrapPhotoPath(item.filePath)
                            item.thumbnailPath = wrapPath.thumbnall_100
                            item.filePath = wrapPath.compress
                            item.realPath = wrapPath.realPath
                        })
                        App.common.modules.imageView.init(null, {
                            showDialog: true,
                            groupTitle: name,
                            //groupDescription: '来生再见',
                            imgData: data
                        })
                    }
                }
            })

        }
    }

    $(function () {
        profileIndex.init($('.mod-profile'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
    })


})(jQuery)