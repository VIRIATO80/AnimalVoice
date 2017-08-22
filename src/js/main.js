window.$ = window.jQuery =  require("jquery");

import LikesManager from "./LikesManager";
import LikesService from "./LikesService";
import CommentsService from "./CommentsService";
import CommentsManager from "./CommentsManager";


const likeService = new LikesService();


//Funcionalidad para el botón de subir al top de la página
function subir() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}


$( document ).ready(function() {

    //Funcionalidad para el botón de volver a inicio
    let backTop = document.getElementById("back-to-top");
    backTop.addEventListener('click', subir);


    //Iniciamos los likes de cada artículo
    const likesManager = new LikesManager(likeService);
    likesManager.leerBotonesLista();

    //De momento aquí
    const commentsService = new CommentsService("/api/comments/");
    const commentsManager = new CommentsManager('.comments-list', commentsService);
    commentsManager.init();


});