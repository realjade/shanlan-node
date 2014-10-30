var config = require('./config')
module.exports = function (grunt) {

    var options = {
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'static/js/libs/jquery/jquery.js',
                    'static/js/libs/jquery/jquery.lazyload.js',
                    'static/js/libs/backbone/underscore.js',
                    'static/js/libs/backbone/backbone.js',
                    'static/js/libs/mustache.js',
                    'static/js/libs/common.js'
                ],
                dest: 'static/js/libs/libs.js'
            }
        },
        concat1:{
            options:{
                separator: ';'
            },
            dist: {
                src: [
                    'static/mobile/js/libs/zepto.min.js',
                    'static/mobile/js/libs/underscore-min.js',
                    'static/mobile/js/libs/backbone-min.js',
                    'static/mobile/js/libs/bootstrap/js/bootstrap.min.js'
                ],
                dest: 'static/mobile/js/libs/libs.min.js'
            }
        }
    };

    if (config.env == 'development') {
        //如果是开发环境
        options.uglify = {
            build: {
                src: 'static/js/libs/libs.js',
                dest: 'static/js/libs/libs.min.js'
            }
        }
    } else {
        options.uglify = {
            build: {
                expand: true,
                cwd: 'static/js/merge',//js目录下
                src: '**/*.js',//所有js文件
                dest: 'static/js/merge'//输出到此目录下
            }
        }
    }

    // Project configuration.
    grunt.initConfig(options);

    // 加载包含 "concat" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //加载css压缩
    grunt.loadNpmTasks('grunt-css');

    //执行压缩合并Lib任务
    grunt.registerTask('default', ['concat', 'concat1', 'uglify']);
};