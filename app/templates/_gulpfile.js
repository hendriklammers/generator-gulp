'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync');

var isProduction = process.env.NODE_ENV === 'production';

var path = {
        html: '*.html',
        scripts: 'src/**/*.js',
        styles: 'sass/**/*.scss'
    };

gulp.task('browser-sync', function() {
    browserSync.init({
        files: [
            path.html,
            'css/*.css',
            'dist/*.js'
        ],
        server: {
            baseDir: ['./']
        },
        notify: true
    });
});

gulp.task('scripts', function() {
    return gulp.src(path.scripts)
        .pipe(plugins.plumber(handleError))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.concat('app.js'))
        .pipe(gulpif(isProduction, plugins.uglify()))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    return gulp.src(path.styles)
        .pipe(plugins.plumber(handleError))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            errLogToConsole: true,
            outputStyle: isProduction ? 'compressed' : 'expanded'
        }))
        .pipe(plugins.autoprefixer('last 2 versions', 'ie 9'))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.styles, ['css']);
    gulp.watch(path.scripts, ['scripts']);
});

/**
 * Displays error message in the console
 * @param error
 */
function handleError(error) {
    plugins.util.log(plugins.util.colors.red('Error (' + error.plugin + '): ' + error.message));

    // jshint validthis: true
    this.emit('end');
}
