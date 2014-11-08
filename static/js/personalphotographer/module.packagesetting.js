/**
 * @name Edwin
 * @description
 * Date: 2014/11/5
 * Time: 12:00
 *
 */

(function($){
    var personalPackageSetting = {
        __container: null,

        init: function(container){
            var self = this
            self.__container = container

            self.__bindEvent();
        },

        __bindEvent: function(){
            var self = this
            var container = self.__container

            container.on('click','.pack-photo-group-block',function(){
                var dialog = self.__associateDialog = new App.common.modules.Dialog({
                    width:1000,
                    height:700,
                    showTitle: false,
                    isConfirm: false,
                    message: '<div class="mod-associate-wrap"></div>'
                })
                dialog.find('.mod-associate-wrap').groupselector({})
                dialog.find('.mod-associate-wrap .cancel').click(function(){
                    dialog.close();
                })
                dialog.find('.mod-associate-wrap .confirm').click(function(){ 
                    dialog.close();
                })
            })

        }
    }
    $(function () {
        personalPackageSetting.init($('.mod-personal-package-setting'))
        App.common.modules.personalLayout.init($('.mod-personal-header-wrap'))
    })
})(jQuery)