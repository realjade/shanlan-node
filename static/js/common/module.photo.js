/**
 * @name Edwin
 * @description
 * Date: 2014/11/18
 * Time: 17:23
 *
 */

(function($){

    var modulePhoto = {
        init: function(){
            var self = this
            self.initPhotoGroupEffect()

        },
        initPhotoGroupEffect: function(){
            $(document).find('.ui-pg1').prepend('<span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/>')
            $(document).find('.ui-pg1-static').prepend('<span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/><span class="ui-bor"/>')
        }
    }

    $(function(){
        modulePhoto.init()
    })

})(jQuery)