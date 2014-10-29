/**
 * @name Edwin
 * @description
 * Date: 2014/10/1
 * Time: 23:05
 *
 */

(function ($) {
    var profilePackage = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container

            var calendar = App.common.modules.calendar.init($('.custom-calendar-wrap', container), {
                selectedDay: {
                    1413993600000: true,
                    1414080000000: true
                },
                clickCallback: function(date){
                    $('.date-selected .bk-date', container).text(date.year + '-' + date.month + '-' + date.day + '（' + date.weekdayname + '）')
                }
            })

            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container
            var calendar = App.common.modules.calendar

            //选择套系
            container.on('click', '.pack-select-btn', function(){
                var item = $(this).parents('.pack-block')
                var id = item.data('id')
                var name = item.data('name')
                var price = item.data('price')

                var packageSelected = $('.package-selected', container)
                packageSelected.data('id', id)
                packageSelected.find('.bk-pack-name').text(name + '（' + price +  '）')

            })

            container.on('click', '.bk-btn', function(){
                console.log(calendar.getCheckedTime())
            })

        }
    }

    $(function () {
        profilePackage.init($('.mod-package'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
    })


})(jQuery)