"use strict";

// imports
const fs = require("fs");

// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const merge = require("merge-stream");

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });

  gulp.watch(["./**/*.css", "./**/*.html", "./**/*.js"], browserSyncReload)
  done();
}

// Clean vendor
function clean(done) {
  fs.rmSync("vendor", {recursive: true, force: true}, (error) => {
    console.error(error);
  });
  done();
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  const bootstrapjs = gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  ], {debug: true})
    .pipe(gulp.dest('./vendor/bootstrap/js'));
  const bootstrapcss = gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
  ], {debug: true})
    .pipe(gulp.dest('./vendor/bootstrap/css'));
  // jQuery
  const jquery = gulp.src([
      './node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  // jQuery UI
  const jqueryUI = gulp.src('./node_modules/jquery-ui/dist/jquery-ui.min.js')
    .pipe(gulp.dest('./vendor/jquery-ui'));
  return merge(bootstrapjs, bootstrapcss, jquery, jqueryUI);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor);
const watch = gulp.series(build, browserSync);

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
