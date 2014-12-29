/**
 * @name Edwin
 * @description
 * Date: 2014/11/5
 * Time: 12:00
 *
 */

(function($){
    var personalPackage = {
        __container: null,

        init: function(container, options){
            var self = this
            self.__options = options
            self.__container = container

            if (options.page) {
                App.common.modules.page.init($('.page-wrap', container), {
                    page: options.page,
                    callback: function (index) {
                        App.modules.photoSearch.setValue('pageIndex', index)
                    }
                })
            }

            self.__bindEvent();
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container

        }
    }

    $(function () {
        personalPackage.init($('.mod-personal-package'), pageConfig)
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })
})(jQuery)