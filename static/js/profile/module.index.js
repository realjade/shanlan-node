/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-23
 * Time: 下午9:41
 *
 */
(function($){
    var profileIndex = {

        __container: null,

        init: function(container){
            var self = this
            self.__container = container

            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container

            container.on('click', '.photo-group', function(){
                self.__initImageView($(this).data('id'))
            })
        },

        __initImageView: function(gid){
            var self = this
            App.common.modules.imageView.init(null, {
                showDialog: true
            })
        }
    }

    $(function(){
        profileIndex.init($('.mod-profile'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
        $("img.lazy").lazyload();
    })


})(jQuery)