/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 2014/9/16
 * Time: 21:10
 *
 */
(function($){
    var outerLayout = {
        __container: null,

        init: function(container){
            var self = this

            self.__container = container

            self.__bindEvent()
            self.__initHeader()

        },

        __bindEvent: function(){
            var self = this
            $(window).resize(function(){
                self.__initHeader()
            })
        },

        __initHeader: function(){
            var self = this
            var container = self.__container
            var header = container.find('.header-bg-wrap')

            header.width($(window).width()).height($(window).height())

            var img = new Image()
            var imgEle = container.find('.header-bg')
            var height = 0
            var src = '//static.iyixiang.cn/static/css/index/images/bg.jpg'

            img.onload = function(){
                imgEle.prop('src' , src)
                //imgEle.css('margin-top', (header.height() - imgEle.height())/3)
                //imgEle.css('margin-left', (header.width() - imgEle.width())/3)
            }

            img.src = src
            imgEle.css({
                width: '100%',
                height: 'auto',
                'visibility': 'visible',
                'opacity': 1
            })
        }
    }

    App.common.modules.outerLayout = outerLayout
})(jQuery)