/**
 * jquery.plupload.queue.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

// JSLint defined globals
/*global plupload:false, jQuery:false, alert:false */

(function ($) {
    var uploaders = {};

    function _(str) {
        return plupload.translate(str) || str;
    }

    function renderUI(id, target) {
        // Remove all existing non plupload items
        target.contents().each(function (i, node) {
            node = $(node);

            if (!node.is('.plupload')) {
                node.remove();
            }
        });
        target.prepend(
            '<div class="plupload_wrapper plupload_scroll">' +
                '<div id="' + id + '_container" class="plupload_container">' +
                '<div class="plupload">' +
                '<div class="plupload_header">' +
                '<div class="plupload_header_content">' +
                '    <em class="icon-arrow-up icon-white"></em>' +
                '<div class="plupload_header_title"><span class="plupload_status_title">' + _('Start upload') + '</span><span class="plupload_status_text"></span></div>' +
                '</div>' +
                '</div>' +
                '<div class="plupload_content">' +
                '<div class="plupload_filelist_header">' +
                '<div class="plupload_file_name">' + _('Filename') + '</div>' +
                '<div class="plupload_file_action">&nbsp;</div>' +
                '<div class="plupload_file_status"><span>' + _('Status') + '</span></div>' +
                '<div class="plupload_file_size">' + _('Size') + '</div>' +
                '<div class="plupload_clearer">&nbsp;</div>' +
                '</div>' +
                '<ul id="' + id + '_filelist" class="plupload_filelist"></ul>' +
                '<div class="plupload_filelist_footer"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<input type="hidden" id="' + id + '_count" name="' + id + '_count" value="0" />' +
                '</div>'
        );
    }

    $.fn.pluploadQueue = function (settings) {
        if (settings) {
            this.each(function () {
                var uploader, target, id;
                target = $(this);
                id = target.attr('id');
                if (!id) {
                    id = plupload.guid();
                    target.attr('id', id);
                }
                uploader = new plupload.Uploader($.extend({
                    dragdrop: true
                }, settings));
                uploaders[id] = uploader;
                function handleStatus(file) {
                    var actionClass;
                    if (file.status == plupload.DONE) {
                        actionClass = 'plupload_done';
                    } else if (file.percent == 100) {
                        actionClass = 'plupload_complete_handling';
                    } else {
                        if (file.status == plupload.FAILED) {
                            actionClass = 'plupload_failed';
                        }
                        if (file.status == plupload.QUEUED) {
                            actionClass = 'plupload_delete';
                        }
                        if (file.status == plupload.UPLOADING) {
                            actionClass = 'plupload_uploading';
                        }
                    }
                    actionClass += ' clr';
                    var icon = $('#' + file.id).attr('class', actionClass).find('a').css('display', 'block');
                    if (file.hint) {
                        icon.attr('title', file.hint);
                    }
                }

                function changeStatus() {
                    var statusTitle,
                        statusText;
                    if (uploader.total.uploaded === uploader.files.length) {
                        statusTitle = _("Upload Complete");
                        statusText = '';
                    } else {
                        statusTitle = _('Start upload');
                        if (uploader.files.length === 1) {
                            statusText = ' (' + uploader.total.percent + '%)';
                        } else {
                            statusText = _('Uploaded %d/%d files').replace(/%d\/%d/, uploader.total.uploaded + '/' + uploader.files.length) + ' (' + uploader.total.percent + '%)';
                        }
                    }
                    $('span.plupload_status_title', target).text(statusTitle);
                    $('span.plupload_status_text', target).text(statusText).show();
                }

                //exports for custom use
                uploader.reset = function () {
                    for (i = 0; i < uploader.files.length; i++) {
                        $('#' + uploader.files[i].id).remove();
                    }
                    uploader.splice();
                }
                function updateList() {
                    var fileList = $('ul.plupload_filelist', target).html(''), inputCount = 0, inputHTML;
                    $.each(uploader.files, function (i, file) {
                        inputHTML = '';
                        if (file.status == plupload.DONE) {
                            if (file.target_name) {
                                inputHTML += '<input type="hidden" name="' + id + '_' + inputCount + '_tmpname" value="' + plupload.xmlEncode(file.target_name) + '" />';
                            }
                            inputHTML += '<input type="hidden" name="' + id + '_' + inputCount + '_name" value="' + plupload.xmlEncode(file.name) + '" />';
                            inputHTML += '<input type="hidden" name="' + id + '_' + inputCount + '_status" value="' + (file.status == plupload.DONE ? 'done' : 'failed') + '" />';
                            inputCount++;
                            $('#' + id + '_count').val(inputCount);
                        }
                        fileList.append(
                            '<li id="' + file.id + '" class="clr plupload_uploading">' +
                                '<div class="plupload_file_name">' + file.name + '</div>' +
                                '<div class="plupload_file_action"><a title="取消上传" href="#"></a></div>' +
                                '<div class="plupload_file_status">0%</div>' +
                                '<div class="plupload_file_size">' + plupload.formatSize(file.size) + '</div>' +
                                inputHTML +
                                '</li>'
                        );
                        //handleStatus(file);
                        $('#' + file.id + ' .plupload_file_action a').click(function (e) {
                            var row = $(this).parent().parent();
                            if (row.is('.plupload_done')) {
                                $(this).attr('title', _('Upload Complete'));
                                return false;
                            }
                            if (row.is('.plupload_complete_handling')) {
                                return false;
                            }
                            if (file.status === 2) {
                                //is uploading
                                uploader.stop();
                            }
                            $('#' + file.id).remove();
                            uploader.removeFile(file);
                            if (uploader.files.length === 0) {
                                uploader.reset();
                            } else {
                                uploader.start();
                            }
                            return false;
                        }).attr('title', _('Cancel upload'));
                    });
                    fileList.delegate('.plupload_file_action a', 'click', function () {
                        var row = $(this).parent().parent();
                        if (row.is('.plupload_done') || row.is('.plupload_complete_handling')) {
                            return false;
                        }
                        if (file.status === plupload.UPLOADING) {
                            uploader.stop();
                        }
                        $('#' + row.attr('id')).remove();
                    });
                    // Scroll to end of file list
                    fileList[0].scrollTop = fileList[0].scrollHeight;
                    changeStatus();
                }

                uploader.bind("UploadFile", function (up, file) {
                    $('#' + file.id).addClass('plupload_current_file');
                });
                uploader.bind("UploadComplete", function (up, file) {
                    if (up.runtime === 'flash') {
                        up.trigger('Refresh');
                    }
                    $('span.plupload_status_title', target).text(_("Upload Complete"));
                });
                uploader.bind('Init', function (up, res) {
                    renderUI(id, target);
                });
                uploader.init();
                uploader.bind("Error", function (up, err) {
                    var file = err.file, message;
                    if (file) {
                        message = err.message;
                        if (err.details) {
                            message += " (" + err.details + ")";
                        }
                        if (err.code == plupload.FILE_SIZE_ERROR) {
                            //alert(_("Error: File too large: ") + file.name);
                            alert(_("Quota exceed error"));
                        }
                        if (err.code == plupload.FILE_EXTENSION_ERROR) {
                            alert(_("Error: Invalid file extension: ") + file.name);
                        }
                        file.hint = message;
                        $('#' + file.id).attr('class', 'plupload_failed').find('a').css('display', 'block').attr('title', message)
                            .end().find('.plupload_file_status').text('0%');
                        file.percent = 0;
                    }
                });
                uploader.bind('StateChanged', function () {
                    if (uploader.state === plupload.STARTED) {
                        changeStatus();
                    }
                });
                uploader.bind('QueueChanged', function () {
                    var d = new Date();
                    updateList();
                    App.log(new Date() - d)
                });
                uploader.bind('FileUploaded', function (up, file) {
                    file.hint = _('Upload Success');
                    handleStatus(file);
                });
                uploader.bind("UploadProgress", function (up, file) {
                    // Set file specific progress
                    $('#' + file.id + ' div.plupload_file_status', target).text(file.percent + '%');
                    if (file.percent === 100) {
                        file.hint = _('Upload Complete Handling');
                    }
                    handleStatus(file);
                    changeStatus();
                });
                // Call setup function
                if (settings.setup) {
                    settings.setup(uploader);
                }
            });
            return this;
        } else {
            // Get uploader instance for specified element
            return uploaders[$(this[0]).attr('id')];
        }
    };
})(jQuery);