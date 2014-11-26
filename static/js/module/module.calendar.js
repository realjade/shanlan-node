/**
 * author: zhangyy-g@grandsoft.com.cn
 * description: dialog
 */

(function ($) {
    var calendar = {

        __container: null,

        __options: null,

        init: function (container, options) {
            var self = this
            self.__container = container
            self.__options = $.extend({
                weeks: [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
                weekabbrs: [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
                months: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                monthabbrs: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                clickCallback: $.noop,
                onDayClick: function($el, $content, dateProperties){
                    self.__dayClick($el, $content, dateProperties)
                },
                onDayHover: function($el, $content, dateProperties){
                    self.__dayHover($el, $content, dateProperties)
                },
                onDayOut: function(){
                    self.__dayOut()
                },
                caldata: '',
                displayWeekAbbr: true,
                selectedDay: {},
                checkedDay: {}
            }, options)

            self.__checkedDay = {}

            self.__tip = $('<div class="calendar-tip arrow_box">提示信息</div>').appendTo($(document.body))

            var cal = self.__calendar = container.find('#calendar').calendario(self.__options)

            self.__initHeader()

            return cal
        },

        getCheckedTime: function(){
            var self = this
            var result = null

            for(var key in self.__checkedDay){
                result = key
            }

            return result
        },

        __initHeader: function () {
            var self = this
            var container = self.__container
            var calendar = self.__calendar

            var month = $('#custom-month', container).html(calendar.getMonthName());
            var year = $('#custom-year', container).html(calendar.getYear());

            $('#custom-next', container).on('click', function () {
                calendar.gotoNextMonth(updateMonthYear);
            });
            $('#custom-prev', container).on('click', function () {
                calendar.gotoPreviousMonth(updateMonthYear);
            });

            function updateMonthYear() {
                month.html(calendar.getMonthName());
                year.html(calendar.getYear());
            }
        },

        __dayClick: function($el, $content, dateProperties){
            var self = this
            var container = self.__container

            var time = new Date(dateProperties.year, dateProperties.month - 1, dateProperties.day).getTime()

            if(!$el.hasClass('fc-past') && !$el.hasClass('fc-selected')){
                container.find('.fc-checked').removeClass('fc-checked')

                $el.addClass('fc-checked')

                self.__checkedDay = {}

                self.__checkedDay[time] = true

                /*if($el.hasClass('fc-checked')){
                    self.__checkedDay[time] = true
                }else{
                    delete self.__checkedDay[time]
                }*/

                self.__options.clickCallback(dateProperties)

                self.__calendar.setOptions({
                    checkedDay: self.__checkedDay
                })
            }
        },

        __dayHover: function($el, $content, dateProperties){
            var self = this
            var tip = self.__tip
            var offset = $el.offset()

            tip.text('可以预订')

            if($el.hasClass('fc-past')){
                //过去的时间
                tip.text('过往时间，不能预订')
            }

            if($el.hasClass('fc-selected')){
                tip.text('当天已被预订了')
            }

            tip.show().css({
                top: offset.top + $el.height() + 8,
                left: offset.left + $el.width()/2 - tip.width()/2
            })
        },

        __dayOut: function(){
            var self = this
            self.__tip.hide()
        }
    }

    App.common.modules.calendar = calendar

})(jQuery)