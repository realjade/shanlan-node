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
        },
        wrapPhotoPath: function(filePath){
            return {
                thumbnall_200: filePath.replace('_X_X', '_THUMBNAIL_200_200'),
                thumbnall_600: filePath.replace('_X_X', '_THUMBNAIL_600_600'),
                compress: filePath.replace('_X_X', '_COMPRESS_'),
                realPath: filePath.replace('_X_X', '')
            }
        },
        paramOfUrl: function (url) {
            url = url || location.href;
            var paramSuit = url.substring(url.indexOf('?') + 1).split("&");
            var paramObj = {};
            for (var i = 0; i < paramSuit.length; i++) {
                var param = paramSuit[i].split('=');
                if (param.length == 2) {
                    var key = decodeURIComponent(param[0]);
                    var val = decodeURIComponent(param[1]);
                    if (paramObj.hasOwnProperty(key)) {
                        paramObj[key] = jQuery.makeArray(paramObj[key]);
                        paramObj[key].push(val);
                    }
                    else {
                        paramObj[key] = val;
                    }
                }
            }
            return paramObj;
        }
    }

    App.common.modules.common = common
})(jQuery)