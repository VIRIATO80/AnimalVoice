window.$ = window.jQuery =  require("jquery");

import LikesManager from "./LikesManager";
import LikesService from "./LikesService";


const likeService = new LikesService();


//Funcionalidad para el botón de subir al top de la página
function subir() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}


$( document ).ready(function() {

    //Funcionalidad para el botón de volver a inicio
    var backTop = document.getElementById("back-to-top");
    backTop.addEventListener('click', subir);


    //Iniciamos los likes de cada artículo de la lista
    const likesManager = new LikesManager('.news', likeService);
    likesManager.leerBotonesLista();


    //Iniciamos el número de likes de la página de detalle
    const likesManagerDetail = new LikesManager('#detalle', likeService);
    likesManagerDetail.leerBotonMeGustaDetalle();

});


