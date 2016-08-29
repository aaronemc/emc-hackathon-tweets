var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    server = require('gulp-express');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('minify', function () {
    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('stream', function () {
    // Endless stream mode
    return watch('sass/**/*.scss', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});


gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['server.js']);

    // Restart the server when file changes
    gulp.watch(['sass/**/*.scss'], ['styles:scss']);


    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    //gulp.watch(['app/images/**/*'], server.notify);
    gulp.watch(['server.js'], [server.run]);
});


gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('default', ['server']);
