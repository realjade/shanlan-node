/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14/12/9
 * Time: 下午9:29
 *
 */
$(function() {

    // Setup html5 version
    $("#uploader").pluploadQueue({
        // General settings
        runtimes : 'html5,flash,silverlight,html4',
        url : '/opf/upload/uploadPhotos?collectionId=1',
        chunk_size: '1mb',
        rename : true,
        dragdrop: true,

        filters : {
            // Maximum file size
            max_file_size : '20mb',
            // Specify what files to browse for
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"},
                {title : "Zip files", extensions : "zip"}
            ]
        },

        /*multipart_params:{
            collectionId: '1'
        },*/

        // Resize images on clientside if we can
        //resize : {width : 320, height : 240, quality : 90},

        flash_swf_url : '//static.mgcheng.com/static/js/libs/jquery/plupload/js/Moxie.swf',
        silverlight_xap_url : '//static.mgcheng.com/static/js/libs/jquery/plupload/js/Moxie.xap'
    });

});