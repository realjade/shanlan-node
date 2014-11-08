/**
 * @name Edwin
 * @description
 * Date: 2014/10/26
 * Time: 13:29
 *
 */

(function($){

    var searchBox = {
        __container: null,
        __options: null,

        init: function(container,options){
            var self = this
            self.__container = container
            self.__options = {
                searchFixed:false
            }
            $.extend(self.__options,options)

        },
        initTemplate:function(){
            var self = this
            var container = self.__container
            var options = self.__options
            $(document.body).append(self.__template)
            if(options.searchFixed){
                $(document.body).append('<div class="FixedSearchBtn"></div>')
            }
        },


        toggleOnTop: function(){
            $('.mod-search-box-wrap').toggle()
        }
    }

    App.common.modules.searchBox = searchBox
})(jQuery)