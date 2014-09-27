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

            $(window).resize(function(){
                container.height($(window).height() + 60)
            })
        }
    }

    App.common.modules.profileLayout = profileLayout
})(jQuery)