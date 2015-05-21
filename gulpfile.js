var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var path = require('path');
var paths = {
    es6: 'be/es6',
    es5: 'be/es5'
}

gulp.task('babel', function () {
    gulp.src(path.join(paths.es6, '**/*.js'))
        .pipe(watch(path.join(paths.es6, '**/*.js')))
        .pipe(babel())
        .pipe(gulp.dest(paths.es5));
});

gulp.task('default', ['babel'])
