/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-22
 * Time: 下午8:45
 *
 */
(function($){
    var message = {
        init: function(container){
            var self = this

            self.__container = container
            App.common.modules.outerLayout.init($('.mod-header'))
        }
    }

    $(function(){
        message.init($('.mod-message'))
    })
    App.modules.message = message
})(jQuery)