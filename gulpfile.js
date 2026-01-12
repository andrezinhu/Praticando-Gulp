const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imageMin = require('gulp-imagemin');

function comprimeImagens(){
    return gulp.src('./source/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJS(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

function compilaSass() {
    return gulp.src("./source/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // COMPILA SCSS → CSS
        .pipe(cleanCSS()) // MINIFICA O CSS
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
    }
    
    exports.default = function watch() {
        gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
        gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJS));
        gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
    };

    // FORMA RECENTE COM GULP 4
    

/*function dizTchau() {
    console.log('Tchau, Gulp!');
}

exports.dizOi = function dizOi(callback) {
    setTimeout(function(){
        console.log('Olá, Gulp!');
        dizTchau();
        callback();
    }, 1000); //tempo em milissegundos que a função vai ser executadaa
};

exports.funcaoPadrao = function funcaoPadrao(callback) {
    setTimeout(function(){
            console.log('Executando via Gulp');
            callback();
    }, 2000); //tempo em milissegundos que a função vai ser executada
};*/



/*exports.javaScript = comprimeJS;
exports.default = gulp.parallel(exports.funcaoPadrao, exports.dizOi);
exports.sass = compilaSass;
exports.images = comprimeImagens;*/


/* FORMA ANTIGA

function funcaoPadrao(callback) {
    console.log('Executando via Gulp');
    callback();
}

function dizOi(callback) {
    console.log('Olá, Gulp!');
    callback();
}

exports.default = funcaoPadrao;
exports.dizOi = dizOi;*/