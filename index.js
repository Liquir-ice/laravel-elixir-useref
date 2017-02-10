var path = require('path'),
    gulp = require('gulp'),
    Elixir = require('laravel-elixir'),
    util = require('gulp-util'),
    useref = require('gulp-useref'),
    minifyCss = require('gulp-clean-css'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    $ = require('gulp-load-plugins')();

var Task = Elixir.Task;

Elixir.extend('useref', function(config, opts) {

    config = config || {};
    opts = opts || {};

    config.baseDir = config.baseDir || 'resources/views';
    config.src = config.src || false;
    config.searchLevel = config.searchLevel || '**/*.blade.php';
    config.outputDir = config.outputDir || 'public';
    config.minifyJs = 'minifyJs' in config ? !!config.minifyJs : true;
    config.minifyCss = 'minifyCss' in config ? !!config.minifyCss : true;

    new Task('useref', function() {

        var src = path.join(config.baseDir, !!config.src ? config.src : config.searchLevel);

        return gulp.src(src)
            .pipe(useref())
            .pipe(config.minifyJs ? $.if('*.js', $.uglify()) : util.noop())
            .pipe(config.minifyCss ? $.if('*.css', minifyCss()) : util.noop())
            .pipe(gulp.dest(config.outputDir))
            .pipe($.size())
            ;
    });

});
