/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 1:55
 *
 */

(function($){

    var personalLayout = {

        __container: null,

        init: function(container){
            var self = this
            self.__container = container

            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            container = self.__container
        }
    }

    App.common.modules.personalLayout = personalLayout
})(jQuery)