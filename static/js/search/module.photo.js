/**
 * @name Edwin
 * @description
 * Date: 2014/10/28
 * Time: 12:13
 *
 */

(function ($) {
    var sequence = {
        COMPR: 0,
        SCORE: 1,
        PRICE_DOWN: 2,
        PRICE_UP: 3,
        TRADE: 4,
        COLLC: 5
    }

    var photo = {
        __container: null,
        __searchType: 0,
        __sequence: sequence.COMPR,

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
            //search event

        }

    }

    $(function () {
        photo.init('.mod-photo', pageConfig)
    })

})(jQuery)