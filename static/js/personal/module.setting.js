/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 1:58
 *
 */

(function ($) {
    var personalSetting = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container

            self.__initInfo()
            self.__initBirthday()
            self.__initProvince()

            self.__bindEvent()
        },

        __initInfo: function(){
            var self = this

        },

        __initBirthday: function(){
            var self = this
            var container = self.__container
            container.find('.birthday').datepicker({
                dateFormat: 'yy-mm-dd',
                monthNamesShort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
                dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六"],
                changeYear: true,
                changeMonth: true,
                maxDate: +0
            })
        },

        __initProvince: function(){
            var self = this
            var container = self.__container
            self.__province = container.find('.province-panel').province({
                nocounty: true
            })
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container
            var infoForm = container.find('.info-setting')
            //提交基本信息
            infoForm.submit(function(){
                var nickNameInput = infoForm.find('#nickname')
                var genderInput = infoForm.find('#gender')

                return false
            })

            //上传头像
            container.on('click', '.upload-btn', function(){
                var dialog = self.__avatarDialog = new App.common.modules.Dialog({
                    width: 750,
                    height: 600,
                    showTitle: false,
                    isConfirm: false,
                    message: '<div class="mod-avatar-dialog-wrap"><div class="mod-avatar-dialog"></div><div class="close"></div></div>'
                })

                dialog.find('.mod-avatar-dialog').avatar({
                    actionUrl: '/opf/upload/uploadAvatar',
                    previewUrl: '/img/',
                    cutUrl:'/s?service=User.cutAvatar'
                })
                dialog.find('.close').click(function(){
                    dialog.close()
                })
            })
        }
    }

    $(function () {
        personalSetting.init($('.mod-personal-setting'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)