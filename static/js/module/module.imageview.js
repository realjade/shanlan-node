/**
 * author: zhangyy-g@grandsoft.com.cn
 * description: dialog
 */

(function($){
    var imageView = {

        __container: null,

        __options: null,

        init: function(container, options){
            var self = this
            self.__container = container
            self.__options = options

            if(options.showDialog){
                self.__initDialog()
            }else{
                //不需要弹层的情况
            }
        },

        __initDialog: function(){
            var self = this
            var dialog = new App.common.modules.Dialog({
                showTitle: false,
                isConfirm: false,
                message: self.__tpl
            })
        }

    }

    imageView.__tpl = '' +
        '<div class="mod-image-view">' +
        '   <em class="prev-btn change-icon"></em>' +
        '   <img class="image-panel" />' +
        '   <em class="next-btn change-icon"></em>' +
        '   <div class="thumbnail-panel">' +
        '       <em class="t-prev-btn"></em>' +
        '       <div class="t-wrap">' +
        '           <div class="t-items"></div>' +
        '        </div>' +
        '       <em class="t-next-btn"></em>' +
        '   </div>' +
        '   <em class="close"></em>' +
        '</div>'

    App.common.modules.imageView = imageView

})(jQuery)