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

            App.modules.photoSearch.init($('.mod-photo-search'))
            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            //search event

        },

        __submitFormFunc: function(){
            var self = this
            var typeInput = container.find('#select-type')
            var styleInput = container.find('#select-style')
            var provinceInput = container.find('#select-province')
            var cityInput = container.find('#select-city')
            var price1Input = container.find('#input-price-1')
            var price2Input = container.find('#input-price-2')
            var pType = typeInput.val()
            var pStyle = styleInput.val()
            var pProvince = provinceInput.val()
            var pCity = cityInput.val()
            var pPrice1 = price1Input.val()
            var pPrice2 = price2Input.val()

            $.ajax({
                url:'/s',
                type:'post',
                data:{
                    service:'',
                    type:pType,
                    style:pStyle,
                    province:pProvince,
                    city:pCity,
                    price1:pPrice1,
                    price2:pPrice2,
                    searchType:self.__searchType,
                    sequence:self.__sequence
                },
                success: function(data){

                }

            })

        }

    }

    $(function(){
        photo.init('.mod-photo')
    })

})(jQuery)