module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      /*concat: {
          options: {
              separator: ';',
          },
          dist: {
              src: [
                  'static/js/libs/jquery/jquery.js', 
                  'static/js/libs/backbone/underscore.js',
                  'static/js/libs/backbone/backbone.js',
                  'static/js/libs/mustache.js'
                  ],
              dest: 'static/js/merge/libs.js',
          },
      },*/
      uglify: {
        /*builda: {
          src: 'static/js/merge/libs.js',
          dest: 'static/js/merge/libs.min.js'
        },*/
        buildb: {
          expand:true,
          cwd:'static/js/merge',//js目录下
          src:'**/*.js',//所有js文件
          dest: 'static/js/merge'//输出到此目录下
        }
      },

      cssmin: {
        my_target: {
            cwd:'static/css/merge',//css目录下
            src: '**/*.css',
            dest: 'static/css/merge'
        }
    }
  });

  // 加载包含 "concat" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //加载css压缩
  grunt.loadNpmTasks('grunt-css');

  //执行压缩合并Lib任务
  grunt.registerTask('default', [/*'concat',*/ 'uglify']);

  // 默认被执行的任务列表。
  //grunt.registerTask('default', ['uglify']);
};