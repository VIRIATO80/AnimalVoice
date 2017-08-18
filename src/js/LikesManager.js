export default class LikesManager {

    constructor(selector, likesService){
        this.likesService = likesService;
        this.element = $(selector);
    }

    init(){
        var self = this;


        //Recorremos los botones y les fijamos su valor inicial
        this.element[0].querySelectorAll('.content .btn-primary').forEach(e => {

            let valor = self.likesService.readLikesArticle(e.getAttribute('data-id'));
            if(valor != null && valor != 'undefined') {
                e.innerHTML = valor + " me gusta";
            }
        });

        //Añadimos evento a cada uno de los botones de me gusta
        this.element.on("click", ".btn-primary" ,function(){
            let valorDespues = self.likesService.addLikeArticle(this.getAttribute('data-id'));
            self.renderLike(this,valorDespues);
        });
    }


    renderLike(e, valor){
        e.innerHTML = valor + " me gusta";
    }
}