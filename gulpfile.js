import gulp from 'gulp';
import { plugins } from './gulp/config/plugins.js';
import { path } from './gulp/config/path.js';

// passing values to a global variable
global.app = {
   isBuild: process.argv.includes('--build'),
   isDev: !process.argv.includes('--build'),
   gulp: gulp,
   path: path,
   plugins: plugins,
};

// import tasks
import { server } from './gulp/tasks/server.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { style } from './gulp/tasks/style.js';
import { js } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { spritesGen } from './gulp/tasks/sprites-gen.js';
import { fonts } from './gulp/tasks/fonts.js';
import { videos } from "./gulp/tasks/video.js";
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// file change watcher
function watcher() {
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.html, style);
   gulp.watch(path.watch.scss, style);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, img);
   gulp.watch(path.watch.svg, spritesGen);
   // gulp.watch(path.watch.json, json);
}

// main tasks
const mainTasks = gulp.parallel(html, style, js, img, videos, fonts, spritesGen); // json

// individual tasks
const spritesGeneration = spritesGen;

// building scenarios for executing tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// scenarios
export { spritesGeneration };
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// default Script
gulp.task('default', dev);

