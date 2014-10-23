/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 1:58
 *
 */

(function ($) {
    var personalSetting = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container

            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

            container.on('click', '.upload-btn', function(){
                var dialog = self.__avatarDialog = new App.common.modules.Dialog({
                    width: 750,
                    height: 600,
                    showTitle: false,
                    isConfirm: false,
                    message: '<div class="mod-avatar-dialog-wrap"><div class="mod-avatar-dialog"></div><div class="close"></div></div>'
                })

                dialog.find('.mod-avatar-dialog').avatar({
                    actionUrl: '/server/user/uploadHeaderPicTmp.koala'
                })
                dialog.find('.close').click(function(){
                    dialog.close()
                })
            })
        }
    }

    $(function () {
        personalSetting.init($('.mod-personal-setting'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })

})(jQuery)