/**
 * Created by glovoadrian on 07/11/16.
 */
var gulp = require('gulp');
var pump = require('pump');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// define tasks here
gulp.task('default', function(cb){
	pump([
			gulp.src('angular-typeform.js'),
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest('.')
		],
		cb
	);
});