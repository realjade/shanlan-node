/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 2014/9/16
 * Time: 20:15
 *
 */
(function($){
    var login = {
        init: function(container){
            App.common.modules.outerLayout.init($('.mod-header'))
        }
    }

    $(function(){
        login.init($('.mod-login'))
    })
    App.modules.login = login
})(jQuery)