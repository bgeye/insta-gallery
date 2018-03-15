

const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const jshint = require('gulp-jshint');
const sass = require('gulp-sass');


gulp.task('default',function() {                     //run with 'gulp' or 'gulp default'
   console.log('hello world');
});

gulp.task('sass',function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())                       //sass präprozessor
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],  //clip path to check!
            cascade:false
        }))
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

gulp.task('lint',function() {
   return gulp.src('app/js/**/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});



gulp.task('watch',['browserSync','sass'],function() {       //executed tasks after call of watch(sass for updates in scss before running task)

    gulp.watch('app/scss/**/*.scss',['sass']);              //executed task after change in scss file
    gulp.watch('app/**/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);

});