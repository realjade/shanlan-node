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

        init: function (container, options) {
            var self = this
            self.__container = container
            self.__options = options

            self.__calendar = App.common.modules.calendar.init($('.custom-calendar-wrap', container), {
                selectedDay: {
                    1413993600000: true,
                    1414080000000: true
                },
                clickCallback: function (date) {
                    $('.date-selected .bk-date', container).text(date.year + '-' + date.month + '-' + date.day + '（' + date.weekdayname + '）')
                }
            })

            self.__initBookedDate()

            self.__bindEvent()
        },

        __initBookedDate: function () {
            var self = this
            var container = self.__container
            var options = self.__options
            $.ajax({
                url: '/s',
                type: 'get',
                data: {
                    service: 'User.listPhotographerBookedDates',
                    photographerName: options.owner.userName
                },
                success: function (data) {
                    if (data.code === 200) {

                    }
                }
            })
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container
            var calendar = App.common.modules.calendar

            //选择套系
            container.on('click', '.pack-select-btn', function () {
                var item = $(this).parents('.pack-block')
                var id = item.data('id')
                var name = item.data('name')
                var price = item.data('price')

                var packageSelected = $('.package-selected', container)
                packageSelected.data('id', id)
                packageSelected.find('.bk-pack-name').text(name + '（' + price + '）')

            })

            container.on('click', '.bk-btn', function () {
                var bookTime = calendar.getCheckedTime()
                var packageId = $('.package-selected', container).data('id')
                var desc = $('.bk-tag', container).val()

                if (!bookTime) {
                    App.common.modules.smallnote('请在上面日历处选择预订的时间', {
                        pattern: 'error',
                        top: ($(window).height() - 60) / 2
                    })
                    return false
                }

                if (!packageId) {
                    App.common.modules.smallnote('请在左边套系列表中选择一个您喜欢的套系', {
                        pattern: 'error',
                        top: ($(window).height() - 60) / 2
                    })
                    return false
                }
                $.ajax({
                    url: '/s',
                    type: 'post',
                    data: {
                        service: 'Trade.addBookedPackageOrder',
                        packageId: packageId,
                        bookDateInMill: bookTime,
                        bookQuantity: 1
                    },
                    success: function (data) {
                        if (data.code === 200) {
                            App.common.modules.smallnote('恭喜您，预订成功！')
                        }
                    }
                })
            })

        }
    }

    $(function () {
        profilePackage.init($('.mod-package'), pageConfig)
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
    })


})(jQuery)