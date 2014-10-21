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
                url: '/opt',
                type: 'get',
                data:{
                    service: 'Photo.listTradePhotos',
                    tradePhotoCollectionId: 1
                },
                success: function(data){
                    if(data.code === 200){
                        App.common.modules.imageView.init(null, {
                            showDialog: true,
                            groupTitle: '婆娑',
                            groupDescription: '来生再见',
                            imgData: data.data
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