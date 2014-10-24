/**
 * @author JadeZhang
 * @context avatar $ plugin
 */
$(function () {
    var _template = '{{#uploadHead}}' +
        '<div id="uploadhead-widget" class="uploadhead-widget">' +
        '  <div class="main-view clr">' +
        '    <div class="image-panel">' +
        '      <div class="upload-loading"></div>' +
        '      <div class="upload-info">' +
        '        <div class="upload-area">' +
        '          <form name="uploaddiv" target="{{target}}" action="" method="post" enctype="multipart/form-data">' +
        '            <button type="button" class="upload-btn">选择图片</button>' +
        '            <input type="file" class="upload-ctrl" name="avatar" />' +
        '          </form>' +
        '        </div>' +
        '        <div class="standard">仅支持jpg，jpeg，gif，png，bmp图片文件，且文件小于1M<br/>{{#isCut}}拖拽或缩放虚线框 生成满意的图像{{/isCut}}</div>' +
        '       </div>' +
        '    </div>' +
        '       <div class="save-file">' +
        '           <button type="button" class="button button-rounded button-primary submit-btn save-btn">保存</button>' +
        '           <span class="hide submit-result-wrap">' +
        '               <span class="submit-result"></span>' +
        '               <span class="submit-result-txt"></span>' +
        '           </span>' +
        '       </div>' +
        '    <div class="image-thumn">' +
        '      <div class="normal">' +
        '        <span><img alt="normal" /></span>' +
        '        <div class="sizedesc">200 * 200 像素</div>' +
        '      </div>' +
        '      <div class="tiny">' +
        '        <span><img alt="tiny" /></span>' +
        '        <div class="sizedesc">120 * 120 像素</div>' +
        '      </div>' +
        '      <div class="mini">' +
        '        <span><img alt="mini" /></span>' +
        '        <div class="sizedesc">32 * 32 像素</div>' +
        '      </div>' +
        '    </div>' +
        '    <iframe name="{{target}}" src="" class="async-upload"></iframe>' +
        '  </div>' +
        '</div>' +
        '{{/uploadHead}}' +
        '{{#uploadAgain}}' +
        '<div id="upload-again" class="upload-again">' +
        '   <form name="uploadAgain" target="{{target}}" action="" method="post" enctype="multipart/form-data">' +
        '       <input type="button" value="+ 重新选择" class="upload-btn" />' +
        '       <input type="file" class="upload-ctrl" name="avatar" />' +
        '   </form>' +
        '</div>' +
        '{{/uploadAgain}}';
    $.fn.avatar = function (o) {
        var self = $(this),
            previewUrl = '';
        init();
        function init() {
            self.options = {
                actionUrl: '',
                previewUrl: '',
                cutUrl: '',
                proxyUrl: '',
                ratio: 1,
                thumbnail: true,
                isCut: true,
                title: '上传头像',
                noImage: '请上传您的头像',
                callback: $.noop,
                clickCallback: function () {
                    return true;
                }
            };
            $.extend(self.options, o);
            show();
            previewSaved();
        }

        function previewSaved(){
            var src =  self.options.previewUrl + '?t=' + new Date().getTime();
            createCropper(src);
            $('#upload-again').show();
            self.find('.save-file').children().show();
            self.find('.submit-result').removeClass('submit-fail').removeClass('submit-success');
            self.find('.submit-result-txt').html('');
            self.find('.image-panel .upload-loading').show();
            self.find('.image-panel .upload-info').hide();
        }

        function show() {
            if (!self.options.clickCallback.call(self))
                return false;
            self.image = null;
            self.target = 'asyncUpload_' + new Date().getTime();
            var w = 715;
            if (!self.options.thumbnail) {
                w = 500;
            }
            self.html($.trim(Mustache.render(_template, {uploadHead: {target: self.target, isCut: self.options.isCut}})));
            self.append($.trim(Mustache.render(_template, {uploadAgain: {target: self.target}})));
            self.find('form').attr('action', self.options.actionUrl);
            self.find('iframe').attr('src', self.options.proxyUrl);
            if (!self.options.thumbnail) {
                self.find('.image-thumn').hide();
            }
            bindEvent();
        }

        function createCropper(imgSrc) {
            self.image = imgSrc;

            var boxWidth = 425,
                boxHeight = 392,
                expect = 200;
            var that = this,
                temp = new Image();
            temp.onerror = function() {
                self.find('.image-panel .upload-loading').hide();
                self.find('.image-panel .upload-info').show();
            };
            temp.onload = function () {
                // 填充图片
                $('#uploadhead-widget .image-panel').html('<div class="crop-panel"><img src="" alt="crop" class="cropholder" /></div>');
                var cropPanel = $('#uploadhead-widget .crop-panel');
                cropPanel.hide();
                var cropper = self.cropper = $.Jcrop(cropPanel.find('img'), {
                    aspectRatio: self.options.ratio,
                    minSize: [30, 30],
                    boxWidth: boxWidth,
                    boxHeight: boxHeight,
                    allowSelect: false,
                    keySupport: false
                });
                cropPanel.show();
                cropper.setImage(imgSrc, function () {
                    // 为了视觉效果 居中显示
                    var holder = this.ui.holder,
                        wsize = this.getWidgetSize(),
                        zoom = wsize[0] / temp.width;

                    holder.css({left: (boxWidth - wsize[0]) / 2, top: (boxHeight - wsize[1]) / 2});

                    // 打开选取框
                    var x1 = (wsize[0] - expect) / 2 / zoom,
                        y1 = (wsize[1] - expect) / 2 / zoom,
                        x2 = ((wsize[0] - expect) / 2 + expect ) / zoom,
                        y2 = ((wsize[1] - expect) / 2 + expect ) / zoom;

                    cropper.setOptions({onChange: changeCoords});
                    cropper.setSelect(temp.width > expect ? [x1, y1, x2, y2] : [0, 0, temp.width, temp.height]);

                });
                if (!self.options.isCut) {
                    $('.jcrop-holder div', self.dialog.element).hide();
                }
            };
            temp.src = imgSrc;
        }

        function changeCoords(coords) {
            var scale = 200 / coords.w,
                bounds = self.cropper.getBounds();

            var normalImage = $('#uploadhead-widget .normal img');
            normalImage.attr('src', self.image).css({width: bounds[0] * scale, marginLeft: -coords.x * scale, marginTop: -coords.y * scale});
            normalImage.show();

            scale = 120 / coords.w;
            var tinyImage = $('#uploadhead-widget .tiny img');
            tinyImage.attr('src', self.image).css({width: bounds[0] * scale, marginLeft: -coords.x * scale, marginTop: -coords.y * scale});
            tinyImage.show();

            scale = 32 / coords.w;
            var miniImage = $('#uploadhead-widget .mini img');
            miniImage.attr('src', self.image).css({width: bounds[0] * scale, marginLeft: -coords.x * scale, marginTop: -coords.y * scale});
            miniImage.show();
        }

        function savediv() {
            var coord = self.cropper.tellSelect();
            $('#upload-again').hide();
            $.ajax({
                url: self.options.cutUrl,
                type: 'post',
                data: {x: parseInt(coord.x, 10), y: parseInt(coord.y), w: parseInt(coord.w, 10), h: parseInt(coord.h, 10)},
                dataType: 'json',
                beforeSend: function () {
                    //console.log('正在处理，请稍等...');
                },
                success: function (res) {
                    if (res && res.code == 0) {
                        self.options.callback.call(self, true, res);
                    } else {
                        self.options.callback.call(self, false, res);
                        $('#upload-again').show();
                    }
                },
                error: function () {
                    $('#upload-again').show();
                }
            });
        }

        function bindEvent() {
            // 自动上传
            self.find('input[name=avatar]').change(function () {
                var file = $(this),
                    address = file.val(),
                    suffix = address.substring(address.lastIndexOf('.') + 1).toLowerCase();

                if (!{'jpg': 1, 'jpeg': 1, 'gif': 1, 'png': 1, 'bmp': 1}[suffix]) {
                    error('仅支持jpg，jpeg，gif，png，bmp图片文件');
                    file.val('');
                    return false;
                } else {
                    success();
                }
                $(this.form).submit();
                $('#upload-again').show();
                self.find('.save-file').children().show();
                self.find('.submit-result').removeClass('submit-fail').removeClass('submit-success');
                self.find('.submit-result-txt').html('');
                self.find('.image-panel .upload-loading').show();
                self.find('.image-panel .upload-info').hide();
            });

            self.find('.save-btn').click(function () {
                if (self.options.isCut) {
                    if (self.image == null) {
                        error(self.options.noImage);
                        return false;
                    }
                    savediv();
                } else {
                    if (previewUrl) {
                        self.options.callback.call(self, true, {previewUrl: previewUrl});
                    } else {
                        error(self.options.noImage);
                        return false;
                    }
                }
            });

            self.find('iframe').bind('load', function () {
                var frame = frames[self.target];
                try {
                    var res = $.parseJSON(frame.document.body.innerHTML);
                    if (res) {
                        success();
                        if (res.code == 200) {
                            var src = self.options.previewUrl + res.data + '?t=' + new Date().getTime();
                            //previewUrl = res.previewUrl || self.options.previewUrl;
                            createCropper(src);
                            frame.document.body.innerHTML = '';
                        }
                        else {
                            error(res.msg);
                            self.find('.image-panel .upload-info').show();
                        }
                    }
                }
                catch (e) {
                }
            });
        }

        function error(txt) {
            self.options.errorCallback(txt);
        }

        function success() {
            //console.log('', {remove: true});
        }
    };
});