// Gulp 4
import gulp from "gulp"

// HTML
import htmlmin from "gulp-htmlmin"

// CSS
import cssnano from "cssnano"
import postcss from "gulp-postcss"
import autoprefixer from "autoprefixer"

// JavaScript
import babel from "gulp-babel"
import terser from "gulp-terser"
import concat from "gulp-concat"

// Imágenes
import imagemin from "gulp-imagemin"

// Cache bust
import cacheBust from 'gulp-cache-bust'

// Plumber
import plumber from 'gulp-plumber'

// Browser Sync
import { init as server, stream, reload } from 'browser-sync'

// Constantes
const cssPluginsProduction = [
	cssnano(),
	autoprefixer()
]
const cssPluginsDevelopment = [
	autoprefixer()
]

// HTML
// Production
gulp.task("html-production", () => {
	return gulp
		.src(["./src/*.html", "./src/**/*.html"])
		.pipe(plumber())
		.pipe(htmlmin({
			collapseWhitespace: true, // false o borrar para que no minifique
			removeComments: true // false o borrar para dejar comentarios
		}))
		.pipe(cacheBust({
			type: 'timestamp'
		}))
		.pipe(gulp.dest("./public/"))
})
// Docs folder
gulp.task("html-docs", () => {
	return gulp
		.src(["./src/*.html", "./src/**/*.html"])
		.pipe(plumber())
		.pipe(htmlmin({
			collapseWhitespace: true, // false o borrar para que no minifique
			removeComments: true // false o borrar para dejar comentarios
		}))
		.pipe(cacheBust({
			type: 'timestamp'
		}))
		.pipe(gulp.dest("./docs/"))
})
// Development
gulp.task("html-dev", () => {
	return gulp
		.src(["./src/*.html", "./src/**/*.html"])
		.pipe(plumber())
		.pipe(cacheBust({
			type: 'timestamp'
		}))
		.pipe(gulp.dest("./public/"))
})

// CSS
// Production
gulp.task("css-production", () => {
	return gulp
		.src("./src/css/*.css")
		.pipe(plumber())
		.pipe(concat("styles.min.css"))
		.pipe(postcss(cssPluginsProduction))
		.pipe(gulp.dest("./public/css"))
		.pipe(stream())
})
// Docs  folder
gulp.task("css-docs", () => {
	return gulp
		.src("./src/css/*.css")
		.pipe(plumber())
		.pipe(concat("styles.min.css"))
		.pipe(postcss(cssPluginsProduction))
		.pipe(gulp.dest("./docs/css"))
		.pipe(stream())
})
// Development
gulp.task("css-dev", () => {
	return gulp
		.src("./src/css/*.css")
		.pipe(plumber())
		.pipe(concat("styles.min.css"))
		.pipe(postcss(cssPluginsDevelopment))
		.pipe(gulp.dest("./public/css"))
		.pipe(stream())
})

// JavaScript
// Production
gulp.task("scripts-production", () => {
	return gulp
		.src("./src/js/*.js")
		.pipe(plumber())
		.pipe(concat("scripts.min.js"))
		.pipe(babel())
		.pipe(terser())
		.pipe(gulp.dest("./public/js"))
})
// Docs folder
gulp.task("scripts-docs", () => {
	return gulp
		.src("./src/js/*.js")
		.pipe(plumber())
		.pipe(concat("scripts.min.js"))
		.pipe(babel())
		.pipe(terser())
		.pipe(gulp.dest("./docs/js"))
})
// Development
gulp.task("scripts-dev", () => {
	return gulp
		.src("./src/js/*.js")
		.pipe(plumber())
		.pipe(concat("scripts.min.js"))
		.pipe(babel())
		.pipe(terser())
		.pipe(gulp.dest("./public/js"))
})

// Images
// Production
gulp.task("images-production", () => {
	return gulp
		.src("src/assets/**/*")
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest("public/assets/"))
})
// Docs folder
gulp.task("images-docs", () => {
	return gulp
		.src("src/assets/**/*")
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest("docs/assets/"))
})
// Development
gulp.task("images-dev", () => {
	return gulp
		.src("src/assets/**/*")
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest("public/assets/"))
})

// Watchers
// Production
gulp.task('production',
	gulp.series(
		gulp.parallel([
			'html-production',
			'css-production',
			'scripts-production',
			'images-production']
		)
	)
)
// Docs folder
gulp.task('docs',
	gulp.series(
		gulp.parallel([
			'html-docs',
			'css-docs',
			'scripts-docs',
			'images-docs']
		)
	)
)
// Development
gulp.task('dev', () => {
	server({
		server: './public',
		browser: 'brave' // msedge, firefox, brave,
	})
	gulp.watch(['./src/*.html', './src/**/*.html'], gulp.series('html-dev')).on('change', reload)
	gulp.watch('./src/css/*.css', gulp.series('css-dev'))
	gulp.watch('./src/js/*.js', gulp.series('scripts-dev')).on('change', reload)
	gulp.watch('./src/assets/images/**/*', gulp.series('images-dev'))
})
