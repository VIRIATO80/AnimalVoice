var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
var gulpImport = require("gulp-html-import");
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var imagemin = require("gulp-imagemin");
var responsive = require("gulp-responsive");
var jsonServer = require('json-server');


// source and distribution folder
var source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
    in: './node_modules/bootstrap-sass/'
};

// fonts
var fonts = {
    in: ['fonts/*.*', source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};




// css source file: .scss files
var scss = {
    in: source + 'scss/main.scss',
    out: dest,
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

//Tarea por defecto
gulp.task("default", ["img", "copiaImg", "copiaVideos", "html", "sassBoot", "js" ], function(){

    //Iniciamos el browser-sync como servidor de desarrollo
    // start the browserSync server
    browserSync.init({ server: "dist/" }
    , function (err, browserSync) {

        // access the browserSync connect instance
        var server = jsonServer.create()
        server.use(jsonServer.defaults())
        server.use(jsonServer.router('db.json'))
            browserSync.app.use('/', server);

    });




    //browserSync.init({ server: "dist/" });
    //console.log('Servidor Arrancado');
    //browserSync.init({ proxy: "http://localhost:8000" });

    //Observa cambios en los archivos sass y entonces ejecuta la tarea sass que compila los fuentes
    //gulp.watch([source+"scss/*.scss", source+"scss/**/*.scss"], ["sass"]);
    gulp.watch(scss.watch, ['sassBoot']);

    // observa cambios en los archivos HTML y entonces recarga el navegador
    gulp.watch([source+"*.html",source+"**/*.html"], ["html"]);


    // observa cambios en los archivos JS y entonces recarga el navegador
    gulp.watch([source+"js/*.js",source+"**/*.js"], ["js"]);


    notify("Sincronización completa");

});


//Copiar a carpeta DIST los archivos HTML utilizando el módulo gulp-html-import
gulp.task("html", function(){
    var sourceFiles = [ source+'*.html' ];
    gulp.src(sourceFiles) //Coger archivos de src
        .pipe(gulpImport(source+"components/")) //reemplaza los @imports del html
        .pipe(htmlmin({collapseWhitespace: true, collapseInlineTagWhitespace: true})) //Minifica el HTML
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
});


//Compilación de Sass


// compilar scss de Bootstrap y el custom
gulp.task('sassBoot', ['fonts'], function () {
    return gulp.src(scss.in)
        .pipe(sourcemaps.init())
        .pipe(sass(scss.sassOpts))
        .pipe(postcss(
            [
                autoprefixer(), //Transforma el CSS dándole compatibilidad a versiones antiguas de los navegadores
                cssnano() //comprime el CSS
            ]
        ))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(scss.out))
        .pipe(browserSync.stream());
});

//Compilar y generar un único JS
gulp.task("js", function(){
    gulp.src(source+"/js/main.js")
        .pipe(tap(function(file){// Tap nos permite ejecutar una funcion por cada fichero seleccionado en gulp.src
            //Reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero
            file.contents = browserify(file.path, {debug: true}) //creamos una instancia de browserify en base al archivo
                .transform("babelify", {presets: ["es2015"]}) //Traduce nuestro código de ES6 a javascript ES5
                .bundle() // compilamos el archivo
                .on("error", function(error){
                    return notify().write(error);
                })
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify()) // Minificamos el Javascript
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        .pipe(notify("JS Compilado"));
});


// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
     return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));

});

// tarea que optimiza y crea las imágenes responsive
gulp.task("img", function(){
    gulp.src(source+"img/*")
        .pipe(responsive({ // generamos las versiones responsive
            '*': [
                { width: 600, height: 300, rename: { suffix: "-pq"}},
                { width: 800, height: 400, rename: { suffix: "-lg"}}
            ]
        }))
        .pipe(imagemin([],{})) // optimizamos el peso de las imágenes
        .pipe(gulp.dest(dest+"img/"));

    //Imagenes de avatar
    gulp.src(source+"img/avatar/*")
        .pipe(responsive({ // generamos las versiones responsive
            '*': [
                { width: 230, height: 230}
            ]
        }))
        .pipe(imagemin([],{})) // optimizamos el peso de las imágenes
        .pipe(gulp.dest(dest+"img/avatar/"))

});




// tarea que copia imagenes
gulp.task("copiaImg", function(){
    gulp.src(source+"img/*")
        .pipe(gulp.dest(dest+"img/"))
});


// tarea que copia videos
gulp.task("copiaVideos", function(){
    gulp.src(source+"video/*")
        .pipe(gulp.dest(dest+"video/"))
});