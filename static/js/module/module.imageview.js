/**
 * author: zhangyy-g@grandsoft.com.cn
 * description: dialog
 */

(function($){
    var imageView = {
        init: function(container, options){

        }
    }

    imageView.__tpl = '' +
        '<div class="mod-image-view">' +
        '   <em class="prev"></em>' +
        '   <div class="image-panel"></div>' +
        '   <em class="next"></em>' +
        '   <div class="count-panel">' +
        '   ' +
        '   </div>' +
        '</div>'

    App.common.modules.imageView = imageView

})(jQuery)