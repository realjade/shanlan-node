/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14/12/9
 * Time: 下午9:29
 *
 */
$(function() {

    var upload = new App.common.modules.upload($("#uploader"), {
        url: '/upload'
    })

    upload.setUrl('/opf/upload/uploadPhotos?collectionId=1')

});