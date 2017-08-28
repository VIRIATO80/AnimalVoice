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

        let metodo = 'post';
        let uri = this.url;

        $.ajax({
            url: uri,
            method: metodo,
            data: comment,
            success: succesCallback,
            error: errorCallback
        });
    }

}