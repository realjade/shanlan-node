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

        init: function (container) {
            var self = this
            self.__container = container

            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

        }
    }

    $(function () {
        personalOrder.init($('.mod-personal'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)