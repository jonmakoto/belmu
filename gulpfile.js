/*!
 * BELMU SVG TASK
 * I tried for ages to get this to work in ROllup or Webpack, but gulp it just 10x easier.
 */

'use strict';

var gulp = require('gulp')
var svgSprite = require("gulp-svg-sprites");

gulp.task('sprites', function () {
  return gulp.src('img/icons/*.svg')
      .pipe(svgSprite({mode: "symbols"}))
      .pipe(gulp.dest("assets/"));
});

gulp.task('default', ['sprites'], function() {
});   