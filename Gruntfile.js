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
                        cwd: 'src/progress-indicator',
                        src: 'template.html',
                        dest: 'dest/progress-indicator',
                        expand: true
                    },
                    {
                        cwd: 'src/add-to-cart-button',
                        src: 'template.html',
                        dest: 'dest/add-to-cart-button',
                        expand: true
                    },
                    {
                        cwd: 'src/demo',
                        src: 'template.html',
                        dest: 'dest/demo',
                        expand: true
                    },
                    {
                        cwd: 'src/app',
                        src: 'template.html',
                        dest: 'dest/app',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-action-sheet',
                        src: 'template.html',
                        dest: 'dest/demo/demo-action-sheet',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-activity-indicator',
                        src: 'template.html',
                        dest: 'dest/demo/demo-activity-indicator',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-button',
                        src: 'template.html',
                        dest: 'dest/demo/demo-button',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-combobox',
                        src: 'template.html',
                        dest: 'dest/demo/demo-combobox',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-dialog',
                        src: 'template.html',
                        dest: 'dest/demo/demo-dialog',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-edit-menu',
                        src: 'template.html',
                        dest: 'dest/demo/demo-edit-menu',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-input',
                        src: 'template.html',
                        dest: 'dest/demo/demo-input',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-list',
                        src: 'template.html',
                        dest: 'dest/demo/demo-list',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-popover',
                        src: 'template.html',
                        dest: 'dest/demo/demo-popover',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-radio',
                        src: 'template.html',
                        dest: 'dest/demo/demo-radio',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-segmented-controls',
                        src: 'template.html',
                        dest: 'dest/demo/demo-segmented-controls',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-switch',
                        src: 'template.html',
                        dest: 'dest/demo/demo-switch',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-tab-bar',
                        src: 'template.html',
                        dest: 'dest/demo/demo-tab-bar',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-toolbar',
                        src: 'template.html',
                        dest: 'dest/demo/demo-toolbar',
                        expand: true
                    },
                    {
                        cwd: 'src/demo/demo-checkbox',
                        src: 'template.html',
                        dest: 'dest/demo/demo-checkbox',
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
                        'src/demo/code.js',
                        'src/app/code.js',
                        'src/router/code.js',
                        'src/add-to-cart-button/code.js',
                        'src/checkbox/code.js',
                        'src/demo/demo-button/code.js',
                        'src/demo/demo-radio/code.js',
                        'src/demo/demo-switch/code.js',
                        'src/demo/demo-edit-menu/code.js',
                        'src/demo/demo-activity-indicator/code.js',
                        'src/demo/demo-segmented-controls/code.js',
                        'src/demo/demo-input/code.js',
                        'src/demo/demo-tab-bar/code.js',
                        'src/demo/demo-toolbar/code.js',
                        'src/demo/demo-action-sheet/code.js',
                        'src/demo/demo-popover/code.js',
                        'src/demo/demo-combobox/code.js',
                        'src/demo/demo-list/code.js',
                        'src/demo/demo-dialog/code.js',
                        'src/demo/demo-checkbox/code.js'
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