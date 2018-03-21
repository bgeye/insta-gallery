

const gulp = require('gulp');                       //gulp package (global and in project)

const autoprefixer = require('gulp-autoprefixer');  //browser prefixes
const browserSync = require('browser-sync');        //browser sync
const cssnano = require('gulp-cssnano');            //minify css
const del = require('del');                         //delete defined source
const gulpIf = require('gulp-if');                  //define conditions
const jshint = require('gulp-jshint');              //check code quality(lint)
const runSequence = require('run-sequence');        //sequence for tasks
const sass = require('gulp-sass');                  //scss -> css
const uglify = require('gulp-uglify');              //minifiy js
const useref = require('gulp-useref');              //concatenate(js, css,...)


gulp.task('default',function() {                     //run with 'gulp' or 'gulp default'
   console.log('hello world');
});

gulp.task('sass',function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())                       //sass präprozessor
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],  //to check it out -> clip path!
            cascade:false                   //does order in css the code in line by column check clip path
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({

            stream: true                    //browserSync
        }));

});

gulp.task('browserSync',function() {
   browserSync.init({
       server: {
           baseDir: 'app'                   //dir to sync
       }
   }) ;
});

gulp.task('lint',function() {
   return gulp.src('app/js/**/*.js')
       .pipe(jshint())                      //check the code
       .pipe(jshint.reporter('default'));   //reporting the errors
});


gulp.task('minify', function() {
    return gulp.src('app/*.html')           //select all html files
        .pipe(useref())                     //load code which is in syntax build (css, js)
        .pipe(gulpIf('*.js',uglify()))      //minimize js
        .pipe(gulpIf('*.css',cssnano()))    //minimize css
        .pipe(gulp.dest('dist'));           //save in folder dist(folder with final app)
});



gulp.task('watch',['browserSync','sass'],function() {       //executed tasks after call of watch(sass for updates in scss before running task)

    gulp.watch('app/scss/**/*.scss',['sass']);              //executed task after change in scss file
    gulp.watch('app/**/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);

});

//copy task(image with png and or jpg files to dist)
gulp.task('copy:img', function() {
   return gulp.src('app/img/**/*.{png,jpg}')
       .pipe(gulp.dest('dist/img'));
});

//task to delete dist
gulp.task('clean:dist', function() { //clean:dist non functional name only to define a lot of clean task and then do one and only clean task
    return del.sync('dist');
});

//PRALLEL task to define e.g. all clean task(syntac clean:dist, clean:other,...)
gulp.task('clean',['clean:dist']);

//SEQUENCE build app ([] = PARALLEL, '','','' = SEQUENCE)
gulp.task('build', function(callback) {
    runSequence('clean','sass','minify',['copy:img'],callback);
})

