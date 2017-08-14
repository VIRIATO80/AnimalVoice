window.$ = window.jQuery =  require("jquery");


//Funcionalidad para el botón de subir al top de la página
function subir() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}


$( document ).ready(function() {

    var backTop = document.getElementById("back-to-top");
    backTop.addEventListener('click', subir);
});


