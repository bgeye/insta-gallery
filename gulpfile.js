

const gulp = require('gulp');
const sass = require('gulp-sass');


gulp.task('default',function() {                     //run with 'gulp' or 'gulp default'
   console.log('hey, hou, I m the default task');
});

gulp.task('sass',function() {
    console.log('ich bin ein präprocessor, hoi du!');

});