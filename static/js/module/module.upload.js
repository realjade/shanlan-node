/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14/12/16
 * Time: 下午8:00
 *
 */
(function($){
    var upload = function(element, options){
        var self = this
        self.__options = $.extend({
            url: '/opf/upload/uploadPhotos?collectionId=1'
        },options)
        self.__element = element.pluploadQueue({
            // General settings
            runtimes : 'html5,flash,html4',
            url : options.url,
            //chunk_size: '1mb',
            rename : true,
            dragdrop: true,

            filters : {
                // Maximum file size
                max_file_size : '20mb',
                // Specify what files to browse for
                mime_types: [
                    {title : "Image files", extensions : "jpg,gif,png"}
                ]
            },

            /*multipart_params:{
             collectionId: '1'
             },*/

            // Resize images on clientside if we can
            //resize : {width : 320, height : 240, quality : 90},

            flash_swf_url : '//static.mgcheng.com/static/js/libs/jquery/plupload/js/Moxie.swf'
        });
    }

    upload.prototype = {
        setOptions: function(options){
            var self = this
            self.__options = $.extend({}, self.__options, options)
        },

        setUrl: function(url){
            this.__element.pluploadQueue().settings.url = url
        }
    }

    App.common.modules.upload = upload
})(jQuery)