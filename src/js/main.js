window.$ = window.jQuery =  require("jquery");

import LikesManager from "./LikesManager";
import LikesService from "./LikesService";
import ScrollManager from "./ScrollManager";



const likeService = new LikesService();





$( document ).ready(function() {


    //Iniciamos los likes de cada artículo
    const likesManager = new LikesManager(likeService);
    likesManager.leerBotonesLista();

    //Iniciamos el gestor de carga de comentarios asíncrona
    const scrollManager = new ScrollManager();

    //Añadimos un evento al scroll del navegador
    window.addEventListener('scroll', scrollManager.lazyLoad);

    //Funcionalidad para el botón de volver a inicio
    let backTop = document.getElementById("back-to-top");
    backTop.addEventListener('click', scrollManager.subir);


});