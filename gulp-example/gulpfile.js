const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
 
gulp.task('default', function() {
  return gulp.src('app/*.jsx')                // The built-in gulp src file globbing utility is used to find all React jsx files
    .pipe(sourcemaps.init())                  // Start watching source files to build source maps for debugging
    .pipe(babel({
      presets: ['es2015', 'react']            // Configure gulp-babel to use ES2015 and React (JSX)
    }))
    .pipe(concat('all.js'))                   // Concats all of the source files together into all.js
    .pipe(sourcemaps.write('.'))              // Writes the source map files separately
    .pipe(gulp.dest('dist'));                 // Redirect all the files to dist/ folder
});

gulp.task('watch', () => {
  watch('app/**.jsx', () => gulp.start('default'));   // Use watch() to watch React JSX files for changes. Whenever a file changes, it will run default build task.
});