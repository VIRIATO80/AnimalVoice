import CommentsService from "./CommentsService";
import CommentsManager from "./CommentsManager";


export default class ScrollManager {

    constructor(){
        //Flag para cargar solo una vez los comentarios
        this.cargados=false;
    }
    //Funcionalidad para el botón de subir al top de la página
    subir() {
        document.body.scrollTop = 0; // For Chrome, Safari and Opera
        document.documentElement.scrollTop = 0; // For IE and Firefox
    }


    //Lazy load por section Commentarios
    lazyLoad() {


        var section = document.getElementById('listadoComentarios');
        if(section != null) {

           //Altura del cuerpo de la noticia
            let altoNoticia = document.getElementById('detalle').offsetHeight;

            //Posición de inicio de la sección comentarios
            let posSection = section.offsetTop;
            let altoSeccion = section.offsetHeight;
            //window.onscroll = function () {

                var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
                if ((((posSection + altoSeccion ) - altoNoticia )<= scrollPosition) && !this.cargados ){
                    const commentsService = new CommentsService("/comentarios/");
                    const commentsManager = new CommentsManager('.comments-list', commentsService);
                    commentsManager.init();
                    this.cargados=true;
                }
            //};
        }
    }
}


