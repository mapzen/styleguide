var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');


gulp.task('sass', function() {
  gulp.src('./src/stylesheets/styleguide.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./examples/build'));
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
  return gulp.src('examples/build/styleguide.css')
    .pipe(s3({
      Bucket: s3bucket,
      ACL: 'public-read',
      keyTransform: function (relative_filename) {
        return 'common/styleguide/styles/' + relative_filename;
      }
    }));
});

gulp.task('default', ['sass','sass:watch']);
