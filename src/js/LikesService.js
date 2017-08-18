

export default class LikesService {

//Al ser un mock, damos por hecho que existen 10 artículos que leer y no más

    readLikesList() {

        //Comprobamos que el navegador soporta la Web Storage
        if (typeof(localStorage) != 'undefined') {
            //Si el almacenamiento está vacío entonces no hacemos más. No hay likes en ninguna noticia
            if (localStorage.length == 0) {
                return;
            }
            //Los artículos los llamaremos con un id
            let listado = [];

            //Leemos del 1 al 10
            for (let i = 0; i < 10; i++) {
                let objeto;
                objeto.key = i;
                objeto.numeroLikes = localStorage.getItem(objeto.key);
                listado.add(objeto);
            }
            return listado;
        }
        else {
            // you can't use web storage
            return;
        }
    }


     readLikesArticle(articleId) {
        if (typeof(localStorage) != 'undefined') {
            return localStorage.getItem(articleId);
        } else {
            return;
        }
    }


     addLikeArticle(articleId) {
        if (typeof(localStorage) != 'undefined') {
            //Primero tenemos que saber el valor actual de likes
            let valor = this.readLikesArticle(articleId);
            //Incrementamos el valor
            valor++;
            localStorage.setItem(articleId, valor);
            return this.readLikesArticle(articleId);
        } else {
            return;
        }
    }


}