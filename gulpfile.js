var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('default', function() {
    gulp.src([
        'js/lib/jquery.js',
        'js/lib/bootstrap.min.js',
        'js/lib/typeahead.jquery.js',
        'js/lib/jspdf.debug.js',
        'js/lib/Chart.bundle.js',
        'js/app/*.js'
    ])
        .pipe(concat('script.js'))
        .pipe(minify({
            ext:{
                src:'.js',
                min:'-min.js'
            }
        }))
        .pipe(gulp.dest('js/build'))

});