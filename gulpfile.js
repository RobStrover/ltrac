var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
    gulp.src([
        'js/app/lib/jquery.js',
        'js/app/lib/bootstrap.min.js',
        'js/app/lib/typeahead.jquery.js',
        'js/app/*.js'
    ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js/build'))

});