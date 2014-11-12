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
            infoForm.find('#nickname').select()
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
                        gender: gender,
                        birthday: birthday
                    },
                    success: function(data){
                        if(data.code === 200){

                        }
                    }
                })

                return false
            })

            //修改密码
            var pwdForm = container.find('.pwd-form')

            pwdForm.submit(function(){
                var currentInput = pwdForm.find('#current-pwd')
                var newInput = pwdForm.find('#new-pwd')
                var checkInput = pwdForm.find('#new-pwd-check')
                var current = $.trim(currentInput.val())
                var newPwd = $.trim(newInput.val())
                var check = $.trim(checkInput.val())
                var error = pwdForm.find('.error')
                error.hide()

                if(!newPwd){
                    error.html('请输入原始密码').show()
                    currentInput.select()
                    return false
                }else{
                    currentInput.val(current)
                }

                if(!newPwd || newPwd.length < 6 || newPwd.length > 32){
                    error.html('请输入6-32位新密码').show()
                    newInput.select()
                    return false
                }else{
                    newInput.val(newPwd)
                }

                if(check != newPwd){
                    error.html('两次输入密码不一致').show()
                    checkInput.select()
                    return false
                }

                $.ajax({
                    url: '/s',
                    type: 'post',
                    data:{
                        service: 'User.updatePassword',
                        userName: options.me.userName,
                        oldPassword: current,
                        newPassword: newPwd
                    },
                    success: function(data){
                        if(data.code === 200){

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