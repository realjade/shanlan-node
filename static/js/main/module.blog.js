/**
 * @name Edwin
 * @description
 * Date: 14-11-27
 * Time: 下午11:45
 *
 */
(function ($) {
    var blog = {
        __container: null,

        init: function (container) {
            var self = this;
            self.__container = container;

            self.__bindEvent();
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

        }
    }

    $(function () {
        blog.init($('.mod-blog'))
    })
})(jQuery)