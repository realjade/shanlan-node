/**
 * @name Edwin
 * @description
 * Date: 2014/10/28
 * Time: 12:13
 *
 */

(function ($) {
    var photo = {
        __container: null,
        __searchType: 0,

        init: function (container, options) {
            var self = this
            self.__container = container
            self.__optioins = options

            App.modules.photoSearch.init($('.mod-photo-search'), container)

            if (options.page) {
                App.common.modules.page.init($('.page-wrap', container), {
                    page: options.page,
                    callback: function (index) {
                        App.modules.photoSearch.setValue('pageIndex', index)
                    }
                })
            }

            self.__initParam()

            self.__bindEvent()
        },

        __initParam: function(){
            var self = this
            var param = App.common.modules.common.paramOfUrl()
            var orderType = param.orderType || '2'

            $('.rule-item').removeClass('rule-item-active')
            $('.rule-item[data-order="' + orderType + '"]').addClass('rule-item-active')
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

            container.on('click', '.rule-item', function(){
                App.modules.photoSearch.setValue('orderType', $(this).data('order'))
            })
            //search event
            container.on('click', '.collection', function(){
                self.__initImageView($(this).data('id'), $(this).data('name'))
            })
        },

        __initImageView: function (gid, name) {
            var self = this

            $.ajax({
                url: '/s',
                type: 'get',
                data:{
                    service: 'Photo.listCollectionPhotos',
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
        photo.init($('.mod-photo'), pageConfig)
    })

})(jQuery)