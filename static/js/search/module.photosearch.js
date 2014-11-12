/**
 * @name Edwin
 * @description
 * Date: 2014/10/26
 * Time: 13:29
 *
 */

(function($){

    var photoSearch = {
        __container: null,

        __options: null,

        init: function(container, options){
            var self = this
            self.__container = container

            self.__options = $.extend({
                submitCallback: $.noop
            }, options)

            self.__initParam()

            self.__bindEvent()
        },
        __initParam: function(){
            var self = this
            var container = self.__container
            var param = App.common.modules.common.paramOfUrl()

            if(param.searchType == 'service'){
                $('.ui-twistbutton', container).removeClass('ui-tb-active')
                $('.ui-tb-right', container).addClass('ui-tb-active')
                $('input[name="searchType"]').val('service')
            }

            if(param.type){
                $('select[name="type"] option[value="' + param.type + '"]', container).prop('selected', 'selected')
            }

            if(param.style){
                $('select[name="style"] option[value="' + param.style + '"]', container).prop('selected', 'selected')
            }

            if(param.style){
                $('select[name="style"] option[value="' + param.style + '"]', container).prop('selected', 'selected')
            }

            if(param.address){
                $('select[name="address"] option[value="' + param.address + '"]', container).prop('selected', 'selected')
            }

            if(param.minPrice){
                $('input[name="minPrice"]', container).val(param.minPrice)
            }

            if(param.maxPrice){
                $('input[name="maxPrice"]', container).val(param.maxPrice)
            }

        },
        __bindEvent: function(){
            var self = this
            var container = self.__container
            var options = self.__options

            container.find('.ui-twistbutton').click(function(){
                $('.ui-twistbutton', container).removeClass('ui-tb-active')
                $(this).addClass('ui-tb-active')
                $('input[name="searchType"]', container).val($(this).data('type'))
            })
            /*container.find('.search-items-form').submit(function(){
                var form = $(this)

                return true
            })*/
        },

        setValue: function(name, value){
            var self = this
            var container = self.__container

            container.find('input[name="' + name + '"]').val(value)
            container.find('.search-items-form').submit()
        }
    }

    App.modules.photoSearch = photoSearch
})(jQuery)