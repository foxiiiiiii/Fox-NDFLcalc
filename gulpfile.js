const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

async function styles() {
  const autoprefixer = (await import("gulp-autoprefixer")).default;

  return src("app/scss/style.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["node_modules/jquery/dist/jquery.js", "node_modules/slick-carousel/slick/slick.js", "app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

async function images() {
  const imagemin = (await import("gulp-imagemin")).default;
  const gifsicle = (await import("imagemin-gifsicle")).default;
  const mozjpeg = (await import("imagemin-mozjpeg")).default;
  const optipng = (await import("imagemin-optipng")).default;
  const svgo = (await import("imagemin-svgo")).default;

  return src("app/images/**/*.*")
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 95, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo(),
      ])
    )
    .pipe(dest("dist/images"));
}

function build() {
  return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js", "app/fonts/**"], {
    base: "app",
  }).pipe(dest("dist"));
}

async function cleanDist() {
  return del("dist");
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.images = images;
exports.build = series(cleanDist, images, build);
exports.cleanDist = cleanDist;
exports.watching = watching;

exports.default = parallel(styles, scripts, browsersync, watching);