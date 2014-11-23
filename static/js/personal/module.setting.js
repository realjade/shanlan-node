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
            var me = self.__options.me
            var container = self.__container

            container.find('#gender').find('option[value="' + me.gender + '"]').prop('selected', 'selected')
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
            var me = self.__options.me
            var container = self.__container
            self.__address = container.find('.province-panel').province({
                nocounty: true,
                province: me.addressBean.province,
                city: me.addressBean.city
            })
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container
            var options = self.__options
            var infoForm = container.find('.info-setting')
            infoForm.find('#nickname').select()
            //提交基本信息
            infoForm.submit(function(){
                var nickNameInput = infoForm.find('#nickname')
                var genderInput = infoForm.find('#gender')
                var birthdayInput = infoForm.find('.birthday')
                var mobileInput = infoForm.find('#mobile')
                var emailInput = infoForm.find('#email')
                var qqInput = infoForm.find('#qq')
                var wechatInput = infoForm.find('#wechat')
                var countryInput = infoForm.find('#country')
                var nickName = $.trim(nickNameInput.val())
                var email = $.trim(emailInput.val())
                var mobile = $.trim(mobileInput.val())
                var qq = $.trim(qqInput.val())
                var wechat = $.trim(wechatInput.val())
                var gender = genderInput.val()
                var birthday = birthdayInput.val()
                var country = countryInput.val()
                var address = self.__address.value()
                var error = infoForm.find('.error')
                error.hide()
                if(!nickName){
                    error.html('请输入您的昵称').show()
                    nickNameInput.select()
                    return false
                }else{
                    nickNameInput.val(nickName)
                }

                if(!email || !App.common.modules.common.isEmail(email)){
                    error.html('请输入您有效的邮箱').show()
                    emailInput.select()
                    return false
                }else{
                    emailInput.val(email)
                }

                if(mobile && !App.common.modules.common.isMobile(mobile)){
                    error.html('请输入合法的手机号').show()
                    mobileInput.select()
                    return false
                }else{
                    mobileInput.val(mobile)
                }

                $.ajax({
                    url: '/s',
                    type: 'post',
                    data:{
                        service: 'User.updateBaseInfo',
                        nickName: nickName,
                        email: email,
                        mobile: mobile,
                        qq: qq,
                        webchart: webchart,
                        gender: gender,
                        birthday: birthday,
                        country: country,
                        province: address.province.value,
                        city: address.city.value
                    },
                    success: function(data){
                        if(data.code === 200){
                            App.common.modules.smallnote('恭喜您，修改信息成功')
                        }
                    }
                })

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
                    //previewUrl: options.me.avatar['200'],
                    cutUrl:'/s?service=User.cutAvatar',
                    errorCallback: function(txt){
                        App.common.modules.smallnote(txt,{
                            pattern: 'error'
                        })
                    },
                    callback: function(ok, res){
                        if(res.code == 200){
                            dialog.close()
                            App.common.modules.smallnote('上传头像成功')
                            $('.avatar-img').prop('src', res.data.replace('X_X', '200_200'))
                        }
                    }
                })
                dialog.find('.close').click(function(){
                    dialog.close()
                })
            })
        }
    }

    $(function () {
        personalSetting.init($('.mod-personal-setting'), pageConfig)
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)