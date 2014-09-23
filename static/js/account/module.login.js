/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 2014/9/16
 * Time: 20:15
 *
 */
(function($){
    var login = {

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
            var psdInput = form.find('input[name="password"]')

            form.submit(function(){
                error.hide()
                var email = $.trim(emailInput.val())
                var psd = $.trim(psdInput.val())
                if(!email){
                    error.text('请输入常用邮箱').show()
                    emailInput.select()
                    return false
                }

                if(!psd){
                    error.text('请输入密码').show()
                    psdInput.select()
                    return false
                }

            })
        }
    }

    $(function(){
        login.init($('.mod-login'))
    })
    App.modules.login = login
})(jQuery)