
/*!
*   jQuery HTML5 Placeholder plugin
*   Copyright (c) 2010 Ciprian Gavrilovici (MS-PL Licence)
*   http://html5placeholder.codeplex.com
*/

/*
*   How to use?
*   Just include jquery.html5.placeholder.js and jquery.html5.placeholder.css in you html and it should work fine.
*/

(function ($) {
    // detect if the browser supports placeholder, and if it does, do nothing!
    var isSupported = 'placeholder' in document.createElement('input'),

        cssClass = 'html5-placeholder'; // Change this if you want to use another css class

    $.fn.html5Placeholder = function () {
        if (isSupported) return;

        var $inputs = $(this),
            focusFn = function () {
                var me = $(this);
                if (me.hasClass(cssClass)) {
                    me.removeClass(cssClass);
                    me.val('');
                }
            };
        // hook up the blur & focus
        $inputs.focus(focusFn).blur(function () {
            var me = $(this);
            if (me.val() == '') {
                me.addClass(cssClass);
                me.val(me.attr('placeholder'));
            }
        });


        // prevent submitting placeholder's value
        // make a little delay before binding to the submit event for being the last in the event handlers chain
        $inputs.parentsUntil(null, 'form').delay(10).submit(function (e) {
            if (e.result === false) return;
            $inputs.each(focusFn);
        });

        // initial set of the placeholder
        $inputs.blur();
    };

    // fire for all inputs with placeholder attribute
    $(function () {
        $('input[placeholder]').html5Placeholder();
    });
})(jQuery);
