/**
 * @author zyy
 */
(function ($) {
    'use strict'


})(jQuery)

$(function () {
    'use strict'
    $.ajaxSetup({
        complete: function (xhr, textStatus, errorThrown) {

        }
    })

    $(document).ajaxError(function (e, xhr, ajaxSettings, thrownError) {
        //xhr.responseText && App.modules.util.actionTip(xhr.responseText)
    })

    $('<div>', {
        id: 'page-global-tip',
        'class': 'page-global-tip',
        text: '正在加载...'
    }).appendTo(document.body)

    new App.modules.Router()

    Backbone.history.start({
        pushState: true,
        root: '/m/'
    })
})
