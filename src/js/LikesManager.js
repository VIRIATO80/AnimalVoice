export default class LikesManager {

    constructor(selector, likesService){
        this.likesService = likesService;
        this.element = $(selector);
    }

    leerBotonesLista() {
        let self = this;


        //Recorremos los botones de la lista y les fijamos su valor inicial

        if (this.element[0] != null && this.element[0] != 'undefined') {

            this.element[0].querySelectorAll('.content .btn-primary').forEach(e => {
                let valor = self.likesService.readLikesArticle(e.getAttribute('data-id'));
                if (valor != null && valor != 'undefined') {
                    e.innerHTML = valor + " me gusta";
                }
            });
        }
        //Añadimos evento a cada uno de los botones de me gusta
        this.element.on("click", ".btn-primary" ,function(){
            let valorDespues = self.likesService.addLikeArticle(this.getAttribute('data-id'));
            self.renderLike(this,valorDespues);
        });
    }

    leerBotonMeGustaDetalle(){
        let boton = this.element.querySelector('.content .btn-primary');

        let valor = this.likesService.readLikesArticle(e.getAttribute('data-id'));
        if (valor != null && valor != 'undefined') {
            e.innerHTML = valor + " me gusta";
        }

        //Añadimos evento a cada uno de los botones de me gusta
        boton.on("click", function(){
            let valorDespues = this.likesService.addLikeArticle(this.getAttribute('data-id'));
            self.renderLike(this,valor);
        });
    }


    renderLike(e, valor){
        e.innerHTML = valor + " me gusta";
    }
}