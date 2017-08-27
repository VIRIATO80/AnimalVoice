import UIManager from './UIManager';


export default class CommentsManager extends UIManager{

    constructor(selector, commentService, pubSub){
        super(selector);
        this.commentService = commentService;
        this.pubSub = pubSub;
    }

    init(){
        console.log('llego');
        this.loadComments();
        //Dejamos de observer el listado de comentarios. Cuando llegue uno nuevo, se debe añadir
        this.pubSub.subscribe("nuevo-comentario",(topic, comentario)=>{
            this.loadComments();
        })
    }


    //Cargar la lista de canciones con AJAX
    loadComments(){
        this.commentService.list(
            comments => {
                if(comments.length == 0){
                    this.setEmpty();
                }else{
                    //Pintamos los comentarios
                    this.renderComments(comments);
                    this.setIdeal();
                }
            }, error => {
                //Mostrar el estado error
                this.setError();
                //Mostrar el error en la consola
                console.error("Error en el servidor al mostrar los comentarios", error);
            }
        );
    }

    renderComments(comments){
        let html = "";
        for(let comment of comments){
            html += this.renderComment(comment);
        }

        //Metemos en el html de la capa correspondiente el list de los comentarios que hay en el backend
        this.setIdealHtml(html);
    }


    //Pintamos el comentario
    renderComment(comment){
     return `<div class="row">
                <div class="col-xs-3 col-sm-3 col-md-2">
                    <div>
                        <img class="img-responsive img-thumbnail" src="/img/avatar/none.jpg">
                    </div>
                </div>
                <div class="col-xs-9 col-sm-9 col-md-10">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <strong>${comment.autor}</strong> <span class="text-muted">&nbsp;${comment.fecha}</span>
                        </div>
                        <div class="panel-body">
                            ${comment.comentario}
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
