import CommentsService from "./CommentsService";
import CommentsManager from "./CommentsManager";
import FormManager from "./FormManager";
import PubSub from 'pubsub-js';

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

    //Funcionalidad para el botón de subir al top de la página
    irAComentariosSection() {
        window.location.href = 'detail.html#listadoComentarios';
    }

    //Lazy load por section Commentarios
    lazyLoad() {


        var section = document.getElementById('listadoComentarios');
        if(section != null) { //Significa que estamos en la página de detalle

            //Gestor de comentarios (ahora basado en JSON)
            const commentsService = new CommentsService("/comentarios/");
           //Altura del cuerpo de la noticia
            let altoNoticia = document.getElementById('detalle').offsetHeight;

            //Posición de inicio de la sección comentarios
            let posSection = section.offsetTop;
            let altoSeccion = section.offsetHeight;
            var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
            if ((((posSection + altoSeccion ) - altoNoticia )<= scrollPosition) && !this.cargados ){
                const commentsManager = new CommentsManager('.comments-list', commentsService, PubSub);
                commentsManager.init();
                this.cargados=true;
            }

            //Iniciamos el gestor del formulario
            const formManager = new FormManager("#contactoForm", commentsService, PubSub);
            formManager.init();
        }
    }
}


