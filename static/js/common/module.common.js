/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-17
 * Time: 下午10:24
 *
 */

$(function(){
    $(document).ajaxError(function (e, xhr, ajaxSettings, thrownError) {
        /*if (xhr.status === 404) {
            //window.location.href = App.modules.util.rootPath + '/error/404'
            return
        }*/
        xhr.responseText && App.common.modules.smallnote(xhr.responseText,{
            pattern: 'error'
        })
    })

    $(document).ajaxSuccess(function (e, xhr, ajaxSettings) {
        var data = JSON.parse(xhr.responseText)
        if(data.code != 200){
            App.common.modules.smallnote(data.message,{
                pattern: 'error'
            })
        }
    })
})

;(function($){
    var common = {
        isEmail: function(email){
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email)
        },
        isMobile: function(mobile){
            return /^\d{11}$/.test(mobile)
        },
        scrollTo: function(top, callback){
            top = top || 0
            $(document.body).animate({
                scrollTop: top
            },'fast', function(){
                callback && callback()
            })
        }
    }

    App.common.modules.common = common
})(jQuery)