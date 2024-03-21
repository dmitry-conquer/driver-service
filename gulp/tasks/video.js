export const videos = () => {
   return app.gulp
     .src(app.path.src.videos)
     .pipe(app.plugins.if(app.isBuild, app.plugins.size({ title: 'Videos', showFiles: true })))
     .pipe(app.gulp.dest(app.path.build.videos));
 };
 