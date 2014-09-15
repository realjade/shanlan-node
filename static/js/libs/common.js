/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-30
 * Time: 下午6:00
 *
 */
(function ($) {
    var a, b;
    $.uaMatch = function (agent) {
        agent = agent.toLowerCase();
        //ie 11
        var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
        var match = rMsie.exec(agent);
        if (match != null) {
            return { browser: "msie", version: match[2] || "0" };
        }
        var b = /(chrome)[ \/]([\w.]+)/.exec(agent) || /(webkit)[ \/]([\w.]+)/.exec(agent) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(agent) || /(msie) ([\w.]+)/.exec(agent) || agent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(agent) || [];

        return {
            browser: b[1] || "",
            version: b[2] || "0"
        }
    }
    a = $.uaMatch(navigator.userAgent);
    b = {};
    a.browser && (b[a.browser] = !0, b.version = a.version);
    b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0);
    $.browser = b;
    $.sub = function () {
        function a(b, c) {
            return new a.fn.init(b, c)
        }

        $.extend(!0, a, this),
            a.superclass = this,
            a.fn = a.prototype = this(),
            a.fn.constructor = a,
            a.sub = this.sub,
            a.fn.init = function c(c, d) {
                return d && d instanceof p && !(d instanceof a) && (d = a(d)),
                    $.fn.init.call(this, c, d, b)
            },
            a.fn.init.prototype = a.fn;
        var b = a(e);
        return a
    };
    // add common module namespace
    //added by baoym@grandsoft.com.cn 2013.9.24
    window.App = $.extend({}, window.App, {
        common: {
        },
        modules: {
        }
    });

    //浏览器判断
    window.browserDetect = typeof browserDetect === 'undefined' ? true : browserDetect;
    if (browserDetect && $.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0' || (document.documentMode && (document.documentMode == 7 || document.documentMode == 6)))) {
        var element = $("<div class='glodon-noie6' style='color:red;background-color: #eaeaea;padding:5px;'>我们发现您当前使用的浏览器版本比较低（IE6 或者 IE7），网站一些功能会不可用<a>X</a></div>");
        element.prependTo($(document.body));
        element.on('click', 'a', function () {
            element.remove();
            element = null;
        });
        //window.location.href = '/account/unsupportedBrowser';
    }
})(jQuery);