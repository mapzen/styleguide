var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var fileinclude = require('gulp-file-include');

gulp.task('clean', function() {
  return del(['examples/dist/**/*']);
});

gulp.task('sass', ['clean'], function() {
  [
    './src/stylesheets/project_specific/documentation/documentation.scss',
    './src/stylesheets/project_specific/blog/blog.scss',
    './src/stylesheets/project_specific/developer/developer.scss',
    './src/stylesheets/project_specific/styleguidepage/styleguidepage.scss',
    './src/stylesheets/styleguide.scss'
  ].forEach(function(file_path) {
    gulp.src(file_path)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .on('error', sass.logError)
      .pipe(gulp.dest('./dist/styles'));
  });
});

gulp.task('fileinclude', function() {
  gulp.src(['./src/components/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/stylesheets/**/*.scss', ['sass']);
  gulp.watch('./src/components/**/*', ['fileinclude']);
});

gulp.task('publish', function() {
  var s3 = require('gulp-s3-upload')();
  var s3bucket;
  if (gutil.env.target === "prod") {
    s3bucket = process.env.MAPZEN_PROD_BUCKET;
  } else {
    s3bucket = process.env.MAPZEN_DEV_BUCKET;
  }
  return gulp.src(
    ['dist/**/*'],
    {base: 'dist'}
  ).pipe(s3({
    Bucket: s3bucket,
    ACL: 'public-read',
    keyTransform: function (relative_filename) {
      return 'common/styleguide/' + relative_filename;
    }
  }));
});

gulp.task('build', ['sass', 'fileinclude']);

gulp.task('default', ['build', 'watch']);
