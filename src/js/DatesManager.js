
const strNow = 'hace un instante';
const strMinute = 'hace un minuto';
const strMinutes = 'hace {num} minutos';
const strHour = 'hace una hora';
const strHours = 'hace {num} horas';
const dias=["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export default class DatesManager {

    constructor(){

    }

    static fechaString(fecha){
        let mes = fecha.getMonth() + 1;
        if(mes < 10){
            mes = '0'+mes;
        }

        return fecha.getDate()+ '/' + mes + '/' +fecha.getFullYear()   + ' a las ' +fecha.getHours()+ ':' +fecha.getMinutes();
    }

   static formateaFecha(fec){

        let fechaRaw = new Date(fec);
        let time = Math.round(fechaRaw.getTime() / 1000);
        //Fecha de hoy
        let now = Math.round(new Date().getTime() / 1000);
        //Diferencia entre fecha de hoy y publicación
        let diff = now - time;
        //Valor de salida
        let out = '';

        if (diff < 60)
            out = strNow;
        else if (diff < 3600)
            out = ( ( out = Math.round(diff / 60) ) == 1 ? strMinute : strMinutes ).replace('{num}', out);
        else if (diff < 3600 * 24)
            out = ( ( out = Math.round(diff / 3660) ) == 1 ? strHour : strHours ).replace('{num}', out);
        else if (diff < 3600 * 24 * 7)
            out = 'El ' + dias[fechaRaw.getDay()];
        else
            out = DatesManager.fechaString(fechaRaw);
        return out;
    }



    updateDates() {
        let elements = document.querySelectorAll('time[data-time]');
        for(let i = 0; i < elements.length; i++){
            let entry = elements[i];
            //Fecha de publicación de la noticia
            let fechaRaw = new Date(entry.getAttribute('data-time'));
            entry.textContent = DatesManager.formateaFecha(fechaRaw);
        }
        setTimeout( this.updateDates , 1000 * 60 );
    }

}