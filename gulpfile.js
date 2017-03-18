   var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

var files = {
  html: __dirname + '/app'
  ,css: __dirname + '/app/css'
  ,js: __dirname + '/app/js'

};
gulp.task('nodemon', (cb)=> {
  var called = false;
  return nodemon({
    script: 'main.js'
		,ext: 'js css html'
    ,ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('browser-sync', ['nodemon'], ()=> {
  browserSync({
	  proxy: process.env.IP+':'+process.env.PORT,  // what do you want to proxy
    port: 5000,  // use *different* port than above
    notify: true
  });
});


gulp.task('default', ['browser-sync'], ()=> {
  	gulp.watch([files.html], reload);
    gulp.watch([files.css], reload);
    gulp.watch([files.js], reload);
});


