/**
 * @name Edwin
 * @description
 * Date: 2014/10/28
 * Time: 12:13
 *
 */

(function($){
    var sequence ={
        COMPR:0,
        SCORE:1,
        PRICE_DOWN:2,
        PRICE_UP:3,
        TRADE:4,
        COLLC:5
    }

    var photo = {
        __container: null,
        __searchType: 0,
        __sequence:sequence.COMPR,

        init: function(container){
            var self = this
            self.__container = container

            App.modules.photoSearch.init($('.mod-photo-search'), container)
            App.common.modules.page.init($('.page-wrap'), container, {
                callback: function(index){

                }
            })
            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            //search event

        }

    }

    $(function(){
        photo.init('.mod-photo')
    })

})(jQuery)