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

    isValid(){
        const inputs = this.element.find("input");
        for(let input of inputs){
            if(input.checkValidity() == false){
                const errorMessage = input.validationMessage;
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }

        //Llegamos a esta línea si no hay ningún error
        this.setIdeal();
        return true;
    }

    send(){
        this.setLoading();
        const comentario = {
            autor: this.element.find("#nombre").val(),
            fecha: new Date(),
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
        this.element[0].reset();//Resetea el formulario
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
