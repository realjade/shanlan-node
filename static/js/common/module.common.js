/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-17
 * Time: 下午10:24
 *
 */
(function($){
    var common = {
        isEmail: function(email){
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(v)
        },
        isMobile: function(mobile){
            return /^\d{11}$/.test(v)
        }
    }

    App.common.modules.common = common
})(jQuery)