var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    del = require('del'),
    fs = require('fs'),
    ghPages = require('gulp-gh-pages'),
    gifsicle = require('imagemin-gifsicle'),
    glob = require('glob'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    importCss = require('gulp-import-css'),
    jpegtran = require('imagemin-jpegtran'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    notify = require('gulp-notify'),
    optipng = require('imagemin-optipng'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    request = require('request'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss');

gulp.task('jekyll', function () {
  return gulp.src('index.md', {
      read: false
    })
    .pipe(shell([
      'bundle exec jekyll build'
    ]));
});

gulp.task('optimize-css', function () {
  return gulp.src('_site/assets/stylesheets/style.scss')
    .pipe(sass())
    .pipe(importCss())
    .pipe(autoprefixer())
    .pipe(uncss({
      html: glob.sync("_site/**/*.html"),
      ignore: [
        'label.active',
        '.dark-mode',
        'span.tweet-time',
        /(#|\.)(is-)/,
        /(#|\.)(has-)/,
        /(#|\.)(js-)/
      ]
    }))
    .pipe(minifyCss({
      keepBreaks: false
    }))
    .pipe(rename('style.min.css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('_site/assets/stylesheets/'));
});

gulp.task('optimize-html', function () {
  return gulp.src('_site/**/*.html')
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(replace(/<link rel="stylesheet" href=\"\/assets\/stylesheets\/style.min.css\"[^>]*>/, function (s) {
      var style = fs.readFileSync('_site/assets/stylesheets/style.min.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
    }))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('_site/'));
});

gulp.task('optimize-js', function () {
  return gulp.src('assets/javascript/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/javascript'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/javascript'))
    .pipe(gulp.dest('_site/assets/javascript'));
});

gulp.task('optimize-images', function () {
  return gulp.src('assets/images/**')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant(), jpegtran(), optipng(), gifsicle()]
    }))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('_site/assets/images'));
});

gulp.task('cleanup-not-minified', function() {
  return del.sync(['_site/assets/javascript/main.js', '_site/assets/stylesheets/']);
});

gulp.task('build', function (callback) {
  runSequence(
    'jekyll',
    'optimize-images',
    'optimize-css',
    'optimize-js',
    'optimize-html',
    'cleanup-not-minified',
    callback
  );
});

gulp.task('rebuild', ['build'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['build'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: true
  });
});

gulp.task('watch', function () {
  gulp.watch('assets/stylesheets/**/*', ['rebuild']);
  gulp.watch('assets/javascript/**/*.js', ['optimize-js']);
  gulp.watch('assets/images/**/*', ['optimize-images']);
  gulp.watch(['*.html', '*.md', '_layouts/*.html', '_includes/*.html', '_posts/*'], ['rebuild']);
});

gulp.task('push', function (callback) {
  return gulp.src('_site/**/*')
    .pipe(ghPages());
});

// Fully build and deploy Jekyll site
gulp.task('deploy', function() {
  runSequence('build', 'push');
});

gulp.task('default', function (callback) {
  runSequence(
    'browser-sync',
    'watch',
    callback
  );
});

// gulp.task('seo', ['build'], function(cb) {
//   request('http://www.google.com/webmasters/tools/ping?sitemap=http://blog.federicomadotto.com/sitemap.xml');
//   request('http://www.bing.com/webmaster/ping.aspx?siteMap=http://blog.federicomadotto.com/sitemap.xml');
//   cb();
// });