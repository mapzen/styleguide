var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var del = require('del');


gulp.task('clean', function() {
  return del(['examples/styles/**/*']);
});

gulp.task('sass', ['clean'], function() {
  [
    './src/stylesheets/project_specific/documentation/documentation.scss',
    './src/stylesheets/project_specific/blog/blog.scss',
    './src/stylesheets/project_specific/developer/developer.scss',
    './src/stylesheets/styleguide.scss'
  ].forEach(function(file_path) {
    gulp.src(file_path)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./examples/styles'));
  });
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/stylesheets/**/*.scss',['sass']);
});

gulp.task('publish', function() {
  var s3 = require('gulp-s3-upload')();
  var s3bucket;
  if (gutil.env.target === "prod") {
    s3bucket = process.env.MAPZEN_PROD_BUCKET;
  } else {
    s3bucket = process.env.MAPZEN_DEV_BUCKET;
  }
  return gulp.src(['examples/styles/**/*', 'examples/images/**/*'], {base: 'examples'})
    .pipe(s3({
      Bucket: s3bucket,
      ACL: 'public-read',
      keyTransform: function (relative_filename) {
        return 'common/styleguide/' + relative_filename;
      }
    }));
});

gulp.task('default', ['sass','sass:watch']);
