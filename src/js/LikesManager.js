export default class LikesManager {

    constructor(selector, likesService){
        this.element = $(selector);
        this.likesService = likesService;
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
        console.log(this.selector);
        let self = this;
        let boton = this.element.querySelector('.content .btn-primary');

        let valor = this.likesService.readLikesArticle(boton.getAttribute('data-id'));
        if (valor != null && valor != 'undefined') {
            boton.innerHTML = valor + " me gusta";
        }

        let idBoton = boton.getAttribute('data-id');
        //Añadimos evento a cada uno de los botones de me gusta
        boton.addEventListener("click", ()=>{
            let valorDespues = this.likesService.addLikeArticle(idBoton);
            this.renderLike(boton,valorDespues);
        });
    }


    renderLike(e, valor){
        e.innerHTML = valor + " me gusta";
    }
}