'use strict'

module.exports = (grunt) => {

    // converts .scss files to .css files
    grunt.loadNpmTasks('grunt-contrib-sass')

    // monitors .scss files for changes and runs the sass task if they change
    grunt.loadNpmTasks('grunt-contrib-watch')

    // runs a minimal web server
    grunt.loadNpmTasks('grunt-contrib-connect')

    grunt.initConfig({

        connect: {
            serve: {
                options: {
                    port: 9000,
                    base: '.'
                }
            }
        },

        watch: {
            sass: {
                files: [
                    'sass/*.{scss,sass}'
                ],
                tasks: ['sass:main']
            }
        },

        sass: {
            options: {
                debugInfo: true,
                noCache: true
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        }
    })

    grunt.registerTask('serve', [
        'connect:serve',
        'watch:sass'
    ])
}