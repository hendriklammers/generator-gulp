'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('browser-sync', function() {
    browserSync.init({
        files: [
            'index.html',
            'css/*.css',
            'scripts/**/*.js'
        ],
        server: {
            baseDir: ['./']
        },
        notify: true
    });
});

gulp.task('jshint', function() {
    return gulp.src('scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass({style: 'compact', sourcemapPath: '../../sass'}))
        .on('error', function (error) {
            console.log(error.message);
        })
        .pipe(gulp.dest('css'));
});

gulp.task('prefixr', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass({style: 'compact', sourcemapPath: '../../sass'}))
        .on('error', function (error) {
            console.log(error.message);
        })
        .pipe(prefix('last 2 versions', '> 1%', 'ie 9', 'ie 8'))
        .pipe(gulp.dest('css'));
});

gulp.task('styles', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass({style: 'compact', sourcemapPath: '../../sass'}))
        .on('error', function (error) {
            console.log(error.message);
        })
        .pipe(prefix('last 2 versions', '> 1%', 'ie 9', 'ie 8'))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['styles', 'jshint']);

gulp.task('watch', ['styles', 'jshint', 'browser-sync'], function () {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('scripts/**/*.js', ['jshint']);
});
