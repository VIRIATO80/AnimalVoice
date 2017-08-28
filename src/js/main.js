window.$ = window.jQuery =  require("jquery");

import LikesManager from "./LikesManager";
import CommentsService from "./CommentsService";
import LikesService from "./LikesService";
import ScrollManager from "./ScrollManager";
import DatesManager from "./DatesManager";
import FormManager from "./FormManager";




$( document ).ready(function() {

    //Iniciamos los likes de cada artículo
    const likeService = new LikesService();
    const likesManager = new LikesManager(likeService);
    likesManager.leerBotonesLista();

    //Gestor de comentarios (ahora basado en JSON)
    const commentsService = new CommentsService("/comentarios/");


    //Iniciamos el gestor de eventos de scroll
    const scrollManager = new ScrollManager(commentsService);

    //Añadimos un evento al scroll del navegador
    window.addEventListener('scroll', ()=>{
        scrollManager.lazyLoad(commentsService);});

    //Funcionalidad para el botón de volver a inicio
    let backTop = document.getElementById("back-to-top");
    backTop.addEventListener('click', scrollManager.subir);

    //Funcionalidad para los enlaces que van directamente a la sección de comentarios
    let botonesComentarios = document.querySelectorAll('.enlaceComentarios');
    Array.prototype.forEach.call (botonesComentarios, function (elem) {
    //botonesComentarios.forEach(function(elem){
        elem.addEventListener("click", function() {
            scrollManager.irAComentariosSection();
            //Movemos un poco el scroll para forzar el evento de carga de comentarios
            let y = $(window).scrollTop();
            $(window).scrollTop(y-50);
        });
    });

    //Iniciamos el gestor de pintar las fechas del listado de noticias según antigüedad
    const datesManager = new DatesManager();
    //Funcionalidad que mira la hora de publicación del listado de noticias (se actualiza cada minuto)
    datesManager.updateDates();

    //Iniciamos el gestor del formulario
    const formManager = new FormManager('.comments-form', commentsService, PubSub);
    formManager.init();


});