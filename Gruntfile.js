   module.exports = function(grunt) {
         // Project configuration.
         grunt.initConfig({
             pkg: grunt.file.readJSON('package.json'),
             // Set up configuration options
             sass: {
                 scss: {
                     files: {
                         'css/main.css': 'scss/main.scss'
                     }
                 }
             },
             watch: {
               css: {
                 files: 'scss/*.scss',
                 tasks: ['sass'],
               },
             },
         });

         // Load the task plugins
         grunt.loadNpmTasks('grunt-contrib-sass');
         grunt.loadNpmTasks('grunt-contrib-watch');

         // Define Tasks.
         // grunt.registerTask('default', ['sass']);

         // grunt.loadNpmTasks('grunt-recess');

         grunt.registerTask('default', ['sass','watch']);

     };
