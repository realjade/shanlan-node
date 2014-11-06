/**
 * @name Edwin
 * @description
 * Date: 2014/11/5
 * Time: 12:00
 *
 */

(function($){
    var personalPackageSetting = {
        __container: null,

        init: function(container){
            var self = this
            self.__container = container

            self.__bindEvent();
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container

        }
    }
    $(function () {
        personalPackageSetting.init($('.mod-personal-package-setting'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })
})(jQuery)