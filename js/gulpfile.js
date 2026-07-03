var gulp         = require('gulp');
var concat       = require('gulp-concat');
var streamqueue  = require('streamqueue');
var gutil        = require('gulp-util');

gulp.task('concatena', function() {
    return streamqueue({ objectMode: true },
        gulp.src('/var/www/client-laravel-api/js/util.js'),
        gulp.src('/var/www/client-laravel-api/js/login.js'),
        gulp.src('/var/www/client-laravel-api/js/categoria.js'),
        gulp.src('/var/www/client-laravel-api/js/divisao.js'),
        gulp.src('/var/www/client-laravel-api/js/time.js'),
        gulp.src('/var/www/client-laravel-api/js/tecnico.js')
    )
    .pipe(concat('scripts.js'))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('/var/www/client-laravel-api/javascript'));
});