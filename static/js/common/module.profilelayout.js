/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-24
 * Time: 下午10:19
 *
 */
(function($){

    var profileLayout = {

        __container: null,

        init: function(container){
            var self = this
            self.__container = container

            container.height($(window).height() + 60)

            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            container = self.__container

            var nav = container.find('.profile-nav')
            var navAvatar = container.find('.profile-nav .avatar')

            $(window).resize(function(){
                container.height($(window).height() + 60)
            })

            $(window).scroll(function(){
                var scrollTop = $(window).scrollTop()
                var height = $(window).height()

                if(scrollTop >= height){
                    nav.css({
                        position: 'fixed',
                        top: 0,
                        bottom: 'auto',
                        'background-color': 'rgba(0,0,0,0.8)'
                    })
                    navAvatar.css('left', '15px')
                }else{
                    nav.css({
                        position: 'absolute',
                        bottom: 0,
                        top: 'auto',
                        'background-color': 'transparent'
                    })
                    navAvatar.css('left', '-30px')
                }
            })

        }
    }

    App.common.modules.profileLayout = profileLayout
})(jQuery)