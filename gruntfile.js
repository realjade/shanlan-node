module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      concat: {
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
              dest: 'static/js/min/libs.js',
          },
      },
      uglify: {
        build: {
          src: 'static/js/min/libs.js',
          dest: 'static/js/min/libs.min.js'
        }
      }
  });

  // 加载包含 "concat" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //执行压缩合并Lib任务
  grunt.registerTask('libs', ['concat', 'uglify']);

  // 默认被执行的任务列表。
  //grunt.registerTask('default', ['uglify']);
};