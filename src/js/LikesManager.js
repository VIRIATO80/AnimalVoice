export default class LikesManager {

    constructor(likesService){
        this.likesService = likesService;
        this.element = $('.btn-xs');
    }

    leerBotonesLista() {
        let self = this;

        //Recorremos los botones de la lista y les fijamos su valor inicial
        if (this.element != null && this.element != 'undefined') {

            for(let i =0; i < this.element.length; i++){
                let boton = this.element[i];
                let valor = self.likesService.readLikesArticle(boton.getAttribute('data-id'));
                if (valor != null && valor != 'undefined') {
                    boton.innerHTML = valor + " me gusta";
                }

                //Añadimos evento a cada uno de los botones de me gusta
                 boton.addEventListener("click", ()=>{
                     let valorDespues = this.likesService.addLikeArticle(boton.getAttribute('data-id'));
                     this.renderLike(boton,valorDespues);
                 });
            }
        }

    }

    renderLike(e, valor){
        e.innerHTML = valor + " me gusta";
    }
}