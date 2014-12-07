/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14/12/7
 * Time: 下午9:27
 *
 */
$(function(){
    $('.collection-photo').click(function(){
        var gid = $(this).data('id')

        if(!gid) return false

        $.ajax({
            url: '/s',
            type: 'get',
            data:{
                service: 'Photo.getPhotoCollectionAndPhotos',
                photoCollectionId: gid
            },
            success: function(data){
                if(data.code === 200){
                    var photos = data.data.photoDTOList
                    $.each(photos, function(idx, item){
                        var wrapPath = App.common.modules.common.wrapPhotoPath(item.filePath)
                        item.thumbnailPath = wrapPath.thumbnall_100
                        item.filePath = wrapPath.compress
                        item.realPath = wrapPath.realPath
                    })
                    App.common.modules.imageView.init(null, {
                        showDialog: true,
                        groupTitle: data.data.name,
                        //groupDescription: '来生再见',
                        imgData: photos
                    })
                }
            }
        })
    })
})