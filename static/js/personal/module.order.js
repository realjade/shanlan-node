/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 23:18
 *
 */

(function ($) {
    var personalOrder = {

        __container: null,

        init: function (container,options) {
            var self = this
            self.__container = container
            if (options.page) {
                App.common.modules.page.init($('.page-wrap', container), {
                    page: options.page,
                    callback: function (index) {
                        location.href = '/personal/order?index='+index
                    }
                })
            }
            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container
        }
    }

    $(function () {
        personalOrder.init($('.mod-personal-order'),pageConfig)
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)