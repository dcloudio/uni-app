var gulp = require('gulp')
var jscs = require('gulp-jscs')
var mocha = require('gulp-mocha')

gulp.task('default', ['test'], function() {
  console.log('done')
})

gulp.task('watch', function () {
  return gulp.watch('**/*.js', ['test'])
})

gulp.task('test', ['jscs', 'mocha'], function () {
  console.log('test done')
})

gulp.task('mocha', function () {
  return gulp.src([
      'test/*.js'
    ]).pipe(mocha())
})

gulp.task('jscs', function () {
  return gulp.src('**/*.js').pipe(jscs())
})
