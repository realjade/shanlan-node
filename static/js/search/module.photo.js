/**
 * @name Edwin
 * @description
 * Date: 2014/10/28
 * Time: 12:13
 *
 */

(function ($) {
    var photo = {
        __container: null,
        __searchType: 0,

        init: function (container, options) {
            var self = this
            self.__container = container
            self.__optioins = options

            App.modules.photoSearch.init($('.mod-photo-search'), container)

            if (options.page) {
                App.common.modules.page.init($('.page-wrap', container), {
                    page: options.page,
                    callback: function (index) {
                        App.modules.photoSearch.setValue('pageIndex', index - 1)
                    }
                })
            }

            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

            container.on('click', '.rule-item', function(){
                App.modules.photoSearch.setValue('orderType', $(this).data('order'))
            })
            //search event

        }

    }

    $(function () {
        photo.init($('.mod-photo'), pageConfig)
    })

})(jQuery)