/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 23:18
 *
 */

(function ($) {
    var personalOrderDetail = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container

            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

            container.on('mouseover','.star',function(){
                var bg = container.find('.star-line')
                var scoreId = $(this).attr('id')
                switch(scoreId){
                    case 'score-1':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-1.png") no-repeat'
                        })
                        break
                    case 'score-2':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-2.png") no-repeat'
                        })
                        break
                    case 'score-3':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-3.png") no-repeat'
                        })
                        break
                    case 'score-4':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-4.png") no-repeat'
                        })
                        break
                    case 'score-5':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-5.png") no-repeat'
                        })
                        break
                }
            })
            container.on('mouseout','.star',function(){
                var bg = container.find('.star-line')
                if(bg.attr('clicked') == 'false'){
                    bg.css({
                        background:'url("//static.mgcheng.com/static/css/personal/images/star-0.png") no-repeat'
                    })
                }
                else{
                    var scoreTxt = container.find('.score').text()
                    switch(scoreTxt){
                        case '1分':
                            bg.css({
                                background:'url("//static.mgcheng.com/static/css/personal/images/star-1.png") no-repeat'
                            })
                            break
                        case '2分':
                            bg.css({
                                background:'url("//static.mgcheng.com/static/css/personal/images/star-2.png") no-repeat'
                            })
                            break
                        case '3分':
                            bg.css({
                                background:'url("//static.mgcheng.com/static/css/personal/images/star-3.png") no-repeat'
                            })
                            break
                        case '4分':
                            bg.css({
                                background:'url("//static.mgcheng.com/static/css/personal/images/star-4.png") no-repeat'
                            })
                            break
                        case '5分':
                            bg.css({
                                background:'url("//static.mgcheng.com/static/css/personal/images/star-5.png") no-repeat'
                            })
                            break
                    }

                }
            })

            container.on('click','.star',function(){
                container.find('.star-line').attr('clicked','true')
                var scoreTxt = container.find('.score')
                var scoreId = $(this).attr('id')
                switch(scoreId){
                    case 'score-1':
                        scoreTxt.text('1分')
                        break
                    case 'score-2':
                        scoreTxt.text('2分')
                        break
                    case 'score-3':
                        scoreTxt.text('3分')
                        break
                    case 'score-4':
                        scoreTxt.text('4分')
                        break
                    case 'score-5':
                        scoreTxt.text('5分')
                        break
                }
            })
        }
    }

    $(function () {
        personalOrderDetail.init($('.mod-personal-orderdetail'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)