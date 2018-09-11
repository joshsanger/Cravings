module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,
                compress: {
                    sequences: false
                },
            },
            build: {
                src: [
                    'development/js/lib/jquery.min.js',
                    'development/js/src/*.js',
                    '!development/js/src/*.es6.js',
                    'development/js/es6-compiled.js'
                ],
                dest: '_assets/js/main.min.js'
            }
        },
        concat : {
            basic : {
                src : [
                    'development/css/src/mixins.less',
                    'development/css/src/reset.less',
                    'development/css/src/global.less',
                    'development/css/src/material-icons.less',
                    'development/css/src/*.less',

                ],
                dest : './_assets/css/staging.less'
            }
        },
        less: {
            options: {
                compress: true,
                banner : '@charset "UTF-8";'
            },
            build: {
                src: '_assets/css/staging.less',
                dest: '_assets/css/master.min.css'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'concat', 'less']);
    grunt.registerTask('buildCss', ['concat', 'less']);
    grunt.registerTask('buildJs', ['uglify']);
};