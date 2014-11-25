/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 1:58
 *
 */

(function ($) {
    var personalAccount = {

        __container: null,

        init: function (container, options) {
            var self = this
            self.__container = container
            self.__options = options

            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container
            //修改密码
            var pwdForm = container.find('.pwd-form')

            pwdForm.submit(function () {
                var currentInput = pwdForm.find('#current-pwd')
                var newInput = pwdForm.find('#new-pwd')
                var checkInput = pwdForm.find('#new-pwd-check')
                var current = $.trim(currentInput.val())
                var newPwd = $.trim(newInput.val())
                var check = $.trim(checkInput.val())
                var error = pwdForm.find('.error')
                error.hide()

                if (!newPwd) {
                    error.html('请输入原始密码').show()
                    currentInput.select()
                    return false
                } else {
                    currentInput.val(current)
                }

                if (!newPwd || newPwd.length < 6 || newPwd.length > 32) {
                    error.html('请输入6-32位新密码').show()
                    newInput.select()
                    return false
                } else {
                    newInput.val(newPwd)
                }

                if (check != newPwd) {
                    error.html('两次输入密码不一致').show()
                    checkInput.select()
                    return false
                }

                $.ajax({
                    url: '/s',
                    type: 'post',
                    data: {
                        service: 'User.updatePassword',
                        oldPassword: current,
                        newPassword: newPwd
                    },
                    success: function (data) {
                        if (data.code === 200) {
                            App.common.modules.smallnote('恭喜您，密码修改成功')
                        }
                    }
                })

                return false
            })

        }
    }

    $(function () {
        personalAccount.init($('.mod-personal-account'), pageConfig)
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)