/**
 * @name Edwin
 * @description
 * Date: 2014/9/30
 * Time: 13:53
 *
 */
(function($){
    var profileTrade = {

        __container: null,

        init: function(container){
            var self = this
            self.__container = container
            self.__bindEvent()
        },

        __bindEvent:function(){
            var self = this
            var container = self.__container

            container.on('click', '.main-photo-group', function () {
                self.__initImageView($(this).data('id'))
            })
        },

        __initImageView: function (gid) {
            var self = this

            $.ajax({
                url: '/s',
                type: 'get',
                data:{
                    service: 'Photo.listTradePhotos',
                    tradePhotoCollectionId: gid
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
                            //groupDescription: '来生再见',
                            imgData: data
                        })
                    }
                }
            })
        }
    }

    $(function(){
        profileTrade.init($('.mod-trade'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
    })


})(jQuery)