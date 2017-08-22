const $ = require("jquery");

export default class CommentsService {

    constructor(url) {
        this.url = url;
    }

    // Obtener un listado de comentarios
    list(succesCallback, errorCallback){
        $.ajax({
            url: this.url,
            success: succesCallback,
            error: errorCallback
        });
    }

    // Grabar un comentario
    save(comment, succesCallback, errorCallback){

        var metodo = 'post';
        var uri = this.url;

        $.ajax({
            url: uri,
            method: metodo,
            data: comment,
            success: succesCallback,
            error: errorCallback
        });
    }

}




/*
function renderComments(comments) {

    var divComments = document.getElementById('divComments');
    //Limpiamos el contenido;
    divComments.innerHTML='';
    if (comments == null || comments.length === 0) {
        divComments.innerHTML='Puedes ser el primero en escribirme';
    } else {
        var nuevoContenido = '<ul>';
        for (var i = 0; i < comments.length; i++) {
            nuevoContenido += '<li><strong>' + comments[i].nombre + '</strong> (' + comments[i].email + ') </li>';
        }
        nuevoContenido += '</ul>';
        divComments.innerHTML=nuevoContenido;
    }
}



function listComments(){
    var XHR = new XMLHttpRequest();
    XHR.open("GET", "/api/comments",true);
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status == 200 ) {
            let commentsList = JSON.parse(XHR.responseText);
            renderComments(commentsList);
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            renderComments([]);
        }
    }

    XHR.send();
}


function saveComment (comment) {
    var XHR = new XMLHttpRequest();
    XHR.open("POST", "/api/comments",true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status == 201 ) {
            listComments();
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Página no encontrada");
        }
    }

    XHR.send(JSON.stringify(comment));
}



listComments();
*/