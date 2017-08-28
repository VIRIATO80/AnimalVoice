import UIManager from './UIManager';


export default class FormManager extends UIManager {

    constructor(elementSelector, commentService, pubSub){
        super(elementSelector); //llamada al constructor de la clase UIManager
        this.commentService = commentService;
        this.pubSub = pubSub;
    }

    init(){
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {

        this.element.on("submit", () => {
            this.validateAndSendData();
            return false;
        });
    }

    validateAndSendData() {
        if(this.isValid()){
            this.send();
        }
    }



    contarPalabras(mensaje){
        //Eliminamos dobles espacios
        let palabras = mensaje.val().trim().replace(/\s{2,}/g, ' ').split(' ');
        //La longitud del value debe ser igual o menor a 120;
        if(palabras.length > 120){
            this.setErrorHtml("Solo se admiten comentarios de hasta 120 palabras");
            this.setError();
            return false;
        }
        return true;
    }


    isValid(){
        const inputs = this.element.find("input");
        for(let i=0; i < inputs.length; i++){
            let input = inputs[i];
            if(input.checkValidity() == false){
                const errorMessage = input.validationMessage;
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }

        //Comprobamos que se han introducido menos de 120 palabras en el textarea de comentario
        let mensaje = this.element.find("textarea");
        if(this.contarPalabras(mensaje)) {
            //Llegamos a esta línea si no hay ningún error
            this.setIdeal();
            return true;
        }else{
            return false;
        }
    }

    dameFecha(){
        let fecha = new Date();
        let mes = fecha.getMonth() + 1;
        if(mes < 10){
            mes = '0'+mes;
        }
        //Formato 2017-07-24T17:35
        return fecha.getFullYear() + '-' + mes+ '-' + fecha.getDate()+ 'T' +fecha.getHours()+ ':' +fecha.getMinutes();
    }

    send(){
        this.setLoading();
        const comentario = {
            autor: this.element.find("#nombre").val(),
            fecha: this.dameFecha(),
            comentario: this.element.find("#comentario").val(),
        };

        this.commentService.save(comentario,
            success => {
                this.pubSub.publish('nuevo-comentario', comentario); //Publicamos el evento que informa de la creación de una canción
                this.resetForm();
                this.setIdeal();

            },
            error => {
                this.setErrorHtml("Se ha producido un error al guardar el comentario");
                this.setError()
            }
        );

    }


    resetForm() {
        this.element.find("form")[0].reset();//Resetea el formulario
    }

    disableFormControls(){
        this.element.find("input, button").attr("disabled", true);
    }


    enableFormControls(){
        this.element.find("input, button").attr("disabled", false);
    }

    setLoading(){
        super.setLoading();
        this.disableFormControls();
    }

    setError(){
        super.setError();
        this.enableFormControls();
    }

    setIdeal(){
        super.setIdeal();
        this.enableFormControls();
    }

}
