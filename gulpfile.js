import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { fontsStyle, otfToTtf, ttfTowoff, woffToBuild } from './gulp/tasks/fonts.js';
import { svgIcons } from './gulp/tasks/svgIcons.js';
import { svgToFont } from './gulp/tasks/svgToFont.js';
import { zip } from './gulp/tasks/zip.js';

function watcher() {
    gulp.watch(app.path.watch.html, html),
    gulp.watch(app.path.watch.scss, scss),
    gulp.watch(app.path.watch.js, js),
    gulp.watch(app.path.watch.images, images)
}

const fonts  = gulp.series(otfToTtf, ttfTowoff, woffToBuild, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images));


const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);

export { dev, build, svgIcons, svgToFont, deployZip }

gulp.task('default', dev);