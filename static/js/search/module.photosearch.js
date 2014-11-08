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

            self.__bindEvent()
        },
        __bindEvent: function(){
            var self = this
            var container = self.__container
            var options = self.__options

            container.find('.ui-twistbutton').click(function(){
                $('.ui-twistbutton', container).removeClass('ui-tb-active')
                $(this).addClass('ui-tb-active')
            })
            container.find('.search-items-form').submit(function(){
                var form = $(this)
                console.log(form.serialize())

                return false
            })

        }
    }

    App.modules.photoSearch = photoSearch
})(jQuery)