var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var del = require('del');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');

gulp.task('clean', function() {
  return del(['examples/dist/**/*']);
});

gulp.task('sass', ['clean'], function() {
  [
    './src/stylesheets/project_specific/documentation/documentation.scss',
    './src/stylesheets/project_specific/website/website.scss',
    './src/stylesheets/project_specific/developer/developer.scss',
    './src/stylesheets/project_specific/styleguidepage/styleguidepage.scss',
    './src/stylesheets/styleguide.scss'
  ].forEach(function(file_path) {
    gulp.src(file_path)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/styles')) // Write unminified CSS first
      .pipe(cssnano({
        safe: true, // Primarily to prevent z-index rebasing, which is a terrible idea
        discardComments: { removeAll: true } // Force removal of noisy /*! "special" comments */
      }))
      .pipe(rename({
        dirname: '',
        extname: '.min.css'
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/styles'));
  });
});

gulp.task('js', function () {
  var b = browserify({
    entries: 'src/scripts/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('src/main.js'))
    .pipe(buffer())
    .pipe(gulpif((gutil.env.target !== "prod"), sourcemaps.init({ loadMaps: true })))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .pipe(rename({
        dirname: '',
        basename: 'mapzen-styleguide',
        extname: '.min.js'
      }))
      .on('error', gutil.log)
    .pipe(gulpif((gutil.env.target !== "prod"), sourcemaps.write('./')))
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('fileinclude', function() {
  gulp.src(['./src/site/*'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/stylesheets/**/*.scss', ['sass']);
  gulp.watch('./src/scripts/**/*.js', ['js']);
  gulp.watch('./src/site/**/*', ['fileinclude']);
});

gulp.task('publish', ['build'], function() {
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
    CacheControl: 'max-age=300,public',
    keyTransform: function (relative_filename) {
      return 'common/styleguide/' + relative_filename;
    }
  }));
});

gulp.task('build', ['sass', 'js', 'fileinclude']);

gulp.task('default', ['build', 'watch']);
