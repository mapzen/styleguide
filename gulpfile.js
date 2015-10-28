var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function() {
  gulp.src('./src/stylesheets/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./examples/build'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/stylesheets/**/*.scss',['sass']);
});

gulp.task('default', ['sass','sass:watch']);
