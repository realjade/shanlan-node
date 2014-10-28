// Password strength meter
// This $ plugin is written by firas kassem [2007.04.05]
// Firas Kassem  phiras.wordpress.com || phiras at gmail {dot} com
// for more information : http://phiras.wordpress.com/2007/04/08/password-strength-meter-a-$-plugin/
(function ($) {
    'use strict'
    var shortPass = 'short'
    var illegalPass = 'illegal'
    var conflictPass = 'conflict'
    var weakPass = 'weak'
    var mediumPass = 'medium'
    var strongPass = 'strong'

    function passwordStrength(password, username) {
        var score = 0

        //password < 6
        if (password.length < 6) {
            return shortPass
        }

        //password == username
        if (password.toLowerCase() == username.toLowerCase()) return conflictPass

        //password length
        score += password.length * 4
        score += (checkRepetition(1, password).length - password.length) * 1
        score += (checkRepetition(2, password).length - password.length) * 1
        score += (checkRepetition(3, password).length - password.length) * 1
        score += (checkRepetition(4, password).length - password.length) * 1

        //password has 3 numbers
        if (password.match(/(.*[0-9].*[0-9].*[0-9])/))  score += 5

        //password has 2 sybols
        if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) score += 5

        //password has Upper and Lower chars
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  score += 10

        //password has number and chars
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  score += 15
        //
        //password has number and symbol
        if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/))  score += 15

        //password has char and symbol
        if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/))  score += 15

        //password is just a nubers or chars
        if (password.match(/^\w+$/) || password.match(/^\d+$/))  score -= 10

        //verifing 0 < score < 100
        if (score < 0)  score = 0
        if (score > 100)  score = 100

        if (score < 34)  return illegalPass
        if (score < 56)  return weakPass
        if (score < 78)  return mediumPass
        return strongPass
    }


    // checkRepetition(1,'aaaaaaabcbc')   = 'abcbc'
    // checkRepetition(2,'aaaaaaabcbc')   = 'aabc'
    // checkRepetition(2,'aaaaaaabcdbcd') = 'aabcd'

    function checkRepetition(pLen, str) {
        var res = ''
        for (var i = 0; i < str.length; i++) {
            var repeated = true
            for (var j = 0; j < pLen && (j + i + pLen) < str.length; j++) {
                repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + pLen))
            }
            if (j < pLen) repeated = false
            if (repeated) {
                i += pLen - 1
                repeated = false
            } else {
                res += str.charAt(i)
            }
        }
        return res
    }

    var template = '' +
        '<div class="pwdStrength">' +
        '<span>密码强度 : <span id="pwdlevel"></span></span>' +
        '<div class="pwd-bar pwd-bar-weak"></div>' +
        '<div class="pwd-bar pwd-bar-medium"></div>' +
        '<div class="pwd-bar pwd-bar-strong"></div>' +
        '</div>'

    var ps = function (input, options) {
        var defaultOptions = {
            userName: '',
            position: 'left',
            offsetLeft: 50,
            offsetRight: -10,
            levels: {
                'weak': '弱',
                'medium': '中',
                'strong': '强'
            }
        }

        this.strength = 'short'

        var __options = $.extend({}, defaultOptions, options)

        var el = $($.trim(Mustache.render(template))).appendTo('body')

        //三角位置
        $('.wsanjiao', el).addClass('wsanjiao-' + __options.position)

        var displayInputTips = function (display) {
            var inputTip = input.parent().parent().find('.input-tip')
            if (display === true) {
                inputTip.show()
            } else {
                inputTip.hide()
            }
        }

        var self = this

        var handler = function () {
            var left = __options.position == 'left' ? (input.width() + __options.offsetLeft) : (__options.offsetRight - el.width())
            el.css({'top': input.offset().top + 8, 'left': input.offset().left + left})
            self.strength = passwordStrength(input.val(), typeof __options.userName === 'string' ? __options.userName : __options.userName.val())
            if (self.strength === 'weak' || self.strength === 'medium' || self.strength === 'strong') {
                el.show()
                displayInputTips(false)
                el.find('.pwd-bar').hide()
                $('.pwd-bar-' + self.strength, el).show()
                $('#pwdlevel', el).html(__options.levels[self.strength]).removeClass().addClass('pwdlevel-' + self.strength)
            } else {
                el.hide()
            }
        }

        input.keyup(handler).focus(handler)
        input.blur(function () {
            el.hide()
            if (self.strength === 'weak' || self.strength === 'medium' || self.strength === 'strong') {
                displayInputTips(false)
            } else {
                displayInputTips(true)
            }
        })
    }

    ps.prototype.getStrength = function () {
        return this.strength
    }

    App.common.modules.passwordStrength = ps

})(jQuery)