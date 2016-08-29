var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');


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

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('default', ['lint']);
