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
                    },
                    {
                        cwd: 'src/directives-test',
                        src: 'template.html',
                        dest: 'dest/directives-test',
                        expand: true
                    },
                    {
                        cwd: 'src/progress-indicator',
                        src: 'template.html',
                        dest: 'dest/progress-indicator',
                        expand: true
                    },
                    {
                        cwd: 'src/radio-button',
                        src: 'radio-button-template.html',
                        dest: 'dest/radio-button',
                        expand: true
                    },
                    {
                        cwd: 'src/switch',
                        src: 'template.html',
                        dest: 'dest/switch',
                        expand: true
                    },
                    {
                        cwd: 'src/app',
                        src: 'template.html',
                        dest: 'dest/app',
                        expand: true
                    },
                    {
                        cwd: 'src/demo',
                        src: 'template.html',
                        dest: 'dest/demo',
                        expand: true
                    },
                    {
                        cwd: 'src/router',
                        src: 'template.html',
                        dest: 'dest/router',
                        expand: true
                    }]
            }
        },
        uglify: {
            build: {
                files: {
                    'dest/code.js': [
                        'node_modules/edom/edom.js',
                        'src/dom-observer/index.js',
                        'src/dom-observer/core.js',
                        'src/dom-observer/create-component.js',
                        'src/dom-observer/addStyle.js',
                        'src/dom-observer/uniqueId.js',
                        'src/dom-observer/templating.js',
                        'src/edit-menu/code.js',
                        'src/progress-indicator/code.js',
                        'src/segmented-controls/code.js',
                        'src/input/code.js',
                        'src/search-bar/code.js',
                        'src/tab-bar/code.js',
                        'src/toolbar/code.js',
                        'src/action-sheet/code.js',
                        'src/alert/code.js',
                        'src/dialog/code.js',
                        'src/color-picker/code.js',
                        'src/popover/code.js',
                        'src/combobox/code.js',
                        'src/switch/code.js',
                        'src/radio-button/code.js',
                        'src/if/code.js',
                        'src/for/code.js',
                        'src/directives-test/code.js',
                        'src/demo/code.js',
                        'src/app/code.js',
                        'src/router/code.js'
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