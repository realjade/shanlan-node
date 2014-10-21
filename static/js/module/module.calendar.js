/**
 * author: zhangyy-g@grandsoft.com.cn
 * description: dialog
 */

(function($){
    var calendar = {

        __container: null,

        __options: null,

        init: function(container, options){
            var self = this
            self.__container = container
            self.__options = $.extend({
                weeks : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
                weekabbrs : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
                months : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                monthabbrs : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                onDayClick: $.noop,
                onDayHover: $.noop,
                caldata: '',
                displayWeekAbbr: true,
                selectedDay: []
            }, options)

            var cal = self.__calendar = container.find('#calendar').calendario(self.__options);

            self.__initHeader()

            return cal
        },

        __initHeader: function(){
            var self = this
            var container = self.__container
            var calendar = self.__calendar

            var month = $('#custom-month', container).html(calendar.getMonthName());
            var year = $('#custom-year', container).html(calendar.getYear());

            $( '#custom-next', container ).on( 'click', function() {
                calendar.gotoNextMonth( updateMonthYear );
            } );
            $( '#custom-prev', container ).on( 'click', function() {
                calendar.gotoPreviousMonth( updateMonthYear );
            } );

            function updateMonthYear() {
                month.html( calendar.getMonthName() );
                year.html( calendar.getYear() );
            }
        }
    }

    App.common.modules.calendar = calendar

})(jQuery)