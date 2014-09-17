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
            var nameInput = form.find('input[name="username"]')
            var psdInput = form.find('input[name="password"]')

            form.submit(function(){
                error.hide()
                var name = $.trim(nameInput.val())
                var psd = $.trim(psdInput.val())
                if(!name){
                    error.text('请输入常用邮箱').show()
                    nameInput.select()
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
        login.init($('.mod-register'))
    })
    App.modules.login = login
})(jQuery)