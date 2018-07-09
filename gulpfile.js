"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    prettify = require('gulp-html-prettify'),
    rename = require('gulp-rename'),
    beautify = require('gulp-beautify'),
    csso = require('gulp-csso'),
    replace = require('gulp-replace'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    svgSprite = require("gulp-svg-sprites");

gulp.task('connect', function() {
    connect.server({
        root: 'build/dest',
        livereload: true
    });
});

gulp.task('svg-sprites', function () {
    return gulp.src('build/src/icons-svg/*.svg')
        .pipe(svgSprite({
            templates: { scss: true },
            preview: false,
            padding: 5,
            cssFile: "src/scss/includes/svg-sprite.scss",
            svgPath: "../img/svg-sprite.svg",
            svg: {
                sprite: "dest/img/svg-sprite.svg"
            },
            common: "svg-icon"
        }))
        .pipe(gulp.dest("build/"));
});

gulp.task('css', function() {
    gulp.src('build/src/scss/all.scss')
        .pipe(sass())
        .pipe(autoprefixer('> 1%'))
        .pipe(csso({comments: false}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/dest/css'))
        .pipe(connect.reload());
});

gulp.task('pug', function() {
    var locals = './build/src/content.json';

    gulp.src('build/src/markup/pages/*.pug')
        .pipe(pug())
        .pipe(prettify({
            unformatted: [],
            indent_char: '\t',
            indent_size: 1
        }))
        .pipe(gulp.dest('build/dest/'))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    gulp.src('build/src/fonts/*')
        .pipe(gulp.dest('build/dest/fonts'));
});

gulp.task('img', function() {
    gulp.src('build/src/img/*.*')
        .pipe(gulp.dest('build/dest/img'));
});

gulp.task('js', function() {
    gulp.src(['build/src/js/*.js', 'build/src/markup/**/*.js'])
        .pipe(concat('js.js'))
        .pipe(uglify())
        .pipe(rename('js.min.js'))
        .pipe(gulp.dest('build/dest/js'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['build/src/**/*.pug'], ['pug']);
    gulp.watch(['build/src/**/*.scss'], ['css']);
    gulp.watch(['build/src/**/*.js'], ['js']);
});

gulp.task('default', [
    'svg-sprites',
    'fonts',
    'img',
    'pug',
    'css',
    'js',
    'connect',
    'watch'
]);