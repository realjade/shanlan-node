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
            self.__initScore()
            self.__bindEvent()
        },

        __initScore: function(){
            var self = this
            var container = self.__container
            var bg = container.find('.star-line')
            var score = bg.attr('value')
            var scoreTxt = container.find('.score')
            if(bg.attr('clicked') == 'true' && score){
                switch(score){
                    case '1':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-1.png") no-repeat'
                        })
                        scoreTxt.text('1分')
                        break
                    case '2':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-2.png") no-repeat'
                        })
                        scoreTxt.text('2分')
                        break
                    case '3':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-3.png") no-repeat'
                        })
                        scoreTxt.text('3分')
                        break
                    case '4':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-4.png") no-repeat'
                        })
                        scoreTxt.text('4分')
                        break
                    case '5':
                        bg.css({
                            background:'url("//static.mgcheng.com/static/css/personal/images/star-5.png") no-repeat'
                        })
                        scoreTxt.text('5分')
                        break
                }
            }
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

            $('#submit-comments').click(function(){
                var tradeOrderId = $('#tradeOrder').attr('tradeorderid')
                var tradeOrderItemId = $('#tradeOrderItem').attr('tradeorderitemid')
                var score = $('.star-line').attr('value')
                var content = $('#comment-content').val()
                var rater = $('#buyer').text()
                var ratee = $('#seller').text()
                if(!score) score=''

                $.ajax({
                    url:'/s',
                    type:'post',
                    data:{
                        service:'Trade.addTradeComment',
                        tradeOrderId: tradeOrderId,
                        tradeOrderItemId: tradeOrderItemId,
                        rater:rater,
                        ratee: ratee,
                        score:score,
                        content: content
                    },
                    success: function(data){
                        if(data.code == 200){
                            App.common.modules.smallnote('评论成功')
                        }
                    }
                })

            })

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
                var bg = container.find('.star-line')
                switch(scoreId){
                    case 'score-1':
                        scoreTxt.text('1分')
                        bg.attr('value','1')
                        break
                    case 'score-2':
                        scoreTxt.text('2分')
                        bg.attr('value','2')
                        break
                    case 'score-3':
                        scoreTxt.text('3分')
                        bg.attr('value','3')
                        break
                    case 'score-4':
                        scoreTxt.text('4分')
                        bg.attr('value','4')
                        break
                    case 'score-5':
                        scoreTxt.text('5分')
                        bg.attr('value','5')
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