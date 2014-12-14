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

        init: function (container,options) {
            var self = this
            self.__container = container
            self.__options = options
            self.__initComments()
            self.__updateStatus($('.status').attr('id'))
            self.__bindEvent()
        },

        __initComments: function(){
            var self = this
            var container = self.__container
            var options = self.__options
            var userType = options.me.type
            var status = $('.status').attr('id')

            if(status == 'FINISHED') $('#order-comments').show()
            if(userType != 'COMMON') {
                $('#comment-content').attr('readonly','true')
                $('.star').css({
                    cursor:'auto'
                })
            }
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
        __updateStatus:function(status){
            var self = this
            var container = self.__container
            var options = self.__options
            var userType = options.me.type
            var btn = $('.process-btn')
            var notice = $('.process-notice')
            $('.status').attr('id',status)
            if(status == 'FINISHED') $('#order-comments').show()
            notice.text('')
            switch(status){
                case 'TOPREPAY':
                    if(userType=='PHOTOGRAPHER'){
                        notice.text('提示：如果用户已通过其他方式支付定金，请确认订单。')
                        btn.text('确认订单')
                        btn.show()
                    }
                    else if(userType =='COMMON'){
                        btn.text('支付定金')
                        btn.show()
                    }
                    break;
                case 'TOCONFIRM':
                    if(userType=='PHOTOGRAPHER'){
                        btn.text('确认订单')
                        btn.show()
                    }
                    else if(userType =='COMMON'){
                        btn.hide()
                    }
                    break;
                case 'TODEAL':
                    if(userType=='PHOTOGRAPHER'){
                        notice.text('提示：建议先上传照片再确认完成拍摄，方便对方直接在平台上下载并展示。对方支付前不会看到照片。')
                        btn.text('完成拍摄')
                        btn.show()
                    }
                    else if(userType =='COMMON'){
                        btn.hide()
                    }
                    break;
                case 'TOPAY':
                    if(userType=='PHOTOGRAPHER'){
                        notice.text('提示：如果用户已通过其他方式支付了全款，请点击按钮，完成本次交易。')
                        btn.text('对方已支付')
                        btn.show()
                    }
                    else if(userType =='COMMON'){
                        notice.text('提示：照片已上传，您支付后可直接通过平台下载并展示，如果您线下完成了支付，请联系摄影师确认。')
                        btn.text('支付全款')
                        btn.show()
                    }
                    break;
                case 'FINISHED':
                    btn.hide()
                    break;
            }

        },
        __bindEvent: function () {
            var self = this
            var container = self.__container
            var options = self.__options
            var userType = options.me.type

            $('.process-btn').click(function(){
                var btn = $(this)
                if(btn.attr('disabled') == 'true') return
                btn.attr('disabled','true')
                var tradeOrderNumber = $('#tradeOrder').attr('number')
                var action = btn.attr('id')
                $.ajax({
                    url:'/s',
                    type:'put',
                    data:{
                        service:'Trade.updateTradeOrderStatus',
                        tradeOrderNumber:tradeOrderNumber
                    },
                    success:function(data){
                        if(data.code==200){
                            self.__updateStatus(data.data)
                            btn.removeAttr('disabled')
                        }
                        else{
                            App.common.modules.smallnote('操作失败，请稍后再试，或者联系我们客服，邮箱地址在网页底端', {
                                time:3000,
                                pattern: 'error',
                                top: ($(window).height() - 60) / 2
                            })
                        }
                    }
                })
            })

            $('#submit-comments').click(function(){
                var tradeOrderId = $('#tradeOrder').attr('tradeorderid')
                var tradeOrderItemId = $('#tradeOrderItem').attr('tradeorderitemid')
                var score = $('.star-line').attr('value')
                var content = $('#comment-content').val()
                var rater = $('#buyer').text()
                var ratee = $('#seller').text()
                if(!score) {
                    App.common.modules.smallnote('请您打分后提交评价', {
                        time:1500,
                        pattern: 'error',
                        top: ($(window).height() - 60) / 2
                    })
                    return false
                }

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
                            App.common.modules.smallnote('评论成功',{
                                top: ($(window).height() - 60) / 2
                            })
                        }
                    }
                })

            })

            container.on('mouseover','.star',function(){
                if(userType != 'COMMON') return
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
                if(userType != 'COMMON') return
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
                if(userType != 'COMMON') return
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
        personalOrderDetail.init($('.mod-personal-orderdetail'),pageConfig)
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)