/*global module,require*/
module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        cssmin: {
            build: {
                files: [
                    {
                        src: 'dest/styles.css',
                        dest: 'dest/styles.css'
                    }
                ]
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dest/index.html': ['src/index.html']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'dest/styles.css': 'src/styles.scss',
                    'src/styles.css': 'src/styles.scss'
                }
            }
        },
        autoprefixer:{
            dist:{
                files:{
                    'dest/styles.css':'dest/styles.css'
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        cwd: 'src',
                        src: '*.woff',
                        dest: 'dest/',
                        expand: true
                    }]
            }
        },
        uglify: {
            build: {
                files: {
                    'dest/code.js': [
                        'src/edit-menu/code.js',
                        'src/progress-indicator/code.js',
                        'src/segmented-controls/code.js',
                        'src/input/code.js',
                        'src/search-bar/code.js',
                        'src/tab-bar/code.js'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', [
        'sass',
        'autoprefixer',
        'cssmin',
        'processhtml',
        'copy',
        'uglify'
    ]);
};