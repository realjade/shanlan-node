/**
 * @name Edwin
 * @description
 * Date: 2014/10/26
 * Time: 14:42
 *
 */
(function($){
    var layout = {
        __container: null,

        init: function(container){
            var self = this
            self.__container = container
            self.__initSearchBox()
            self.__bindEvent()
        },
        __initSearchBox: function(){
            App.common.modules.searchBox.init()
        },
        __bindEvent: function(){
            var self = this
            var container = self.__container

            container.on('click','.header-search-btn',function(){
                App.common.modules.searchBox.toggleOnTop()
            })
        }
    }
    App.common.modules.layout = layout

    $(function () {
        App.common.modules.layout.init($('.mod-header-wrap'));
    })
})(jQuery)