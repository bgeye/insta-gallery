

const gulp = require('gulp');

const browserSync = require('browser-sync');
const sass = require('gulp-sass');


gulp.task('default',function() {                     //run with 'gulp' or 'gulp default'
   console.log('hey, hou, I m the default task');
});

gulp.task('sass',function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())                       //sass präprozessor
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({

            stream: true                    //browserSync
        }));

});

gulp.task('browserSync',function() {
   browserSync.init({
       server: {
           baseDir: 'app'
       },
   }) ;
});

gulp.task('watch',['browserSync','sass'],function() {       //executed tasks after call of watch(sass for updates in scss before running task)

    gulp.watch('app/scss/**/*.scss',['sass']);              //executed task after change in scss file
    gulp.watch('app/**/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);

});