import iconfont from 'gulp-iconfont';

export const svgToFont = () => {
    return app.gulp.src([`${app.path.src.svgicons}`])
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVGTOFONT",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(iconfont({
            fontName: 'icons', // required
            prependUnicode: true, // recommended option
            formats: ['ttf'], // default, 'woff2' and 'svg' are available
            normalize: true,
            fontHeight: 1001,
            //timestamp: runTimestamp, // recommended to get consistent builds when watching files
        }))
        .on('glyphs', function (glyphs, options) {
            // CSS templating, e.g.
            console.log(glyphs, options);
        })
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
}