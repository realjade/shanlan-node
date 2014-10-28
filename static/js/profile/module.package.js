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
                }
            })

            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container
            var calendar = App.common.modules.calendar

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