/**
 * author: @huntbao
 * description: jQuery placeholder js
 */
(function ($) {
    var isSupported = 'placeholder' in document.createElement('input');
    $.fn.placeholder = function (wrapper) {
        if (isSupported) return this;
        this.each(function () {
            var t = $(this);
            var placeholder = t.attr('placeholder');
            if (!placeholder) return t;
            if (wrapper) {
                t.wrap($('<div class="placeholder-inp-wrap"></div>'));
                $('<label class="placeholder-inp-label">' + placeholder + '</label>').insertBefore(t);
            }
            var checkVal = function (t) {
                if (t.val() === '') {
                    t.prev().show();
                } else {
                    t.prev().hide();
                }
            };
            t.bind('focus blur keydown paste', function () {
                var tt = $(this);
                setTimeout(function () {
                    checkVal(tt);
                }, 0);
            }).prev().show().click(function () {
                $(this).next().focus();
            });
        });
        return this;
    }
})(jQuery);
