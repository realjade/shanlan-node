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

            App.common.modules.common.scrollTo($('.user-info .avatar-img').offset().top - 30)

            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            container = self.__container

            var nav = container.find('.profile-nav')
            var navAvatar = container.find('.profile-nav .avatar-wrap')
            var avatar = container.find('.user-info .avatar-img')

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
                        'background-color': 'rgba(0,0,0,0.9)'
                    }),
                    navAvatar.css({
                        left: '15px',
                        opacity:'1'
                    }),
                    avatar.css({
                        opacity:'0'
                    })

                }else{
                    nav.css({
                        position: 'absolute',
                        bottom: 0,
                        top: 'auto',
                        'background': 'rgba(0,0,0,0.65)'
                    })
                    navAvatar.css({
                        left:'-30px',
                        opacity:'0'
                    }),
                    avatar.css({
                        opacity:'1'
                    })
                }
            })

        }
    }

    App.common.modules.profileLayout = profileLayout
})(jQuery)