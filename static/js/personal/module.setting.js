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

        init: function (container, options) {
            var self = this
            self.__container = container
            self.__options = options

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
            var options = self.__options
            var infoForm = container.find('.info-setting')
            //提交基本信息
            infoForm.submit(function(){
                var nickNameInput = infoForm.find('#nickname')
                var genderInput = infoForm.find('#gender')
                var birthdayInput = infoForm.find('.birthday')
                var mobileInput = infoForm.find('#mobile')
                var emailInput = infoForm.find('#email')
                var nickName = $.trim(nickNameInput.val())
                var email = $.trim(emailInput.val())
                var mobile = $.trim(mobileInput.val())
                var gender = genderInput.val()
                var birthday = birthdayInput.val()

                if(!nickName){

                }

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
                    previewUrl: '/img/' + options.me.avatar[200],
                    cutUrl:'/s?service=User.cutAvatar',
                    errorCallback: function(txt){
                        App.common.modules.smallnote(txt,{
                            pattern: 'error'
                        })
                    }
                })
                dialog.find('.close').click(function(){
                    dialog.close()
                })
            })
            $('.upload-btn').trigger('click')
        }
    }

    $(function () {
        personalSetting.init($('.mod-personal-setting'), pageConfig)
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)