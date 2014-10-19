/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 2014/9/16
 * Time: 20:15
 *
 */
(function($){
    var register = {

        __container: null,

        init: function(container){
            var self = this

            self.__container = container
            App.common.modules.outerLayout.init($('.mod-header'))

            self.__bindEvent()
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container
            var form = container.find('.mod-form')
            var error = container.find('.form-error')
            var emailInput = form.find('input[name="email"]')
            var userNameInput = form.find('input[name="userName"]')
            var psdInput = form.find('input[name="password"]')
            var cityInput = form.find('input[name="city"]')

            form.submit(function(){
                error.hide()
                var email = $.trim(emailInput.val())
                var userName = $.trim(userNameInput.val())
                var psd = $.trim(psdInput.val())
                var city = $.trim(cityInput.val())

                if(!email || !App.common.modules.common.isEmail(email)){
                    error.text('请输入常用的合法邮箱').show()
                    emailInput.select()
                    return false
                }

                if(!userName){
                    error.text('请输入您的用户名').show()
                    userNameInput.select()
                    return false
                }else{
                    form.find('input[name="nickName"]').val(userName)
                }

                if(!psd){
                    error.text('请输入密码').show()
                    psdInput.select()
                    return false
                }

                /*if(!city){
                    error.text('请输入您所在的城市').show()
                    cityInput.select()
                    return false
                }*/
            })
        }
    }

    $(function(){
        register.init($('.mod-register'))
    })
    App.modules.register = register
})(jQuery)