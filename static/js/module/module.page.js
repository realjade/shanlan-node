/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14/11/10
 * Time: 下午4:44
 *
 */
(function ($) {
    var page = {
        init: function (container, options) {
            var self = this
            self.__container = container
            self.__options = $.extend({
                page: {},
                callback: $.noop
            }, options)

            self.__panel = $(self.__tpl).appendTo(container)

            self.__initPage()
        },

        __initPage: function(){
            var self = this
            var panel = self.__panel
        },

        __bindEvent: function(){
            var self = this
            var options = self.__options
            var panel = self.__panel

            panel.on('click', '.page-index', function(){
                options.callback($(this).data('index'))
            })

            panel.on('click', '.page-arrow-left', function(){
                var index = options.page.currentPage - 1
                if(index < 1){
                    return false
                }
                options.callback(index)
            })

            panel.on('click', '.page-arrow-right', function(){
                var index = options.page.currentPage + 1
                if(index > options.page.totalPage){
                    return false
                }
                options.callback(index)
            })
        }
    }

    page.__tpl = '' +
    '<div class="page-index-wrap">' +
    '   <a class="page-arrow-left"></a>' +
    '   <div class="pages"></div>' +
    '   <a class="page-arrow-right"></a>' +
    '</div>'

    page.__itemTpl = '{{#page}}<a class="page-index {{#isCurrent}}current-page-index{{/isCurrent}}" data-index="index">{{index}}</a>{{/page}}'

    App.common.modules.page = page
})(jQuery)