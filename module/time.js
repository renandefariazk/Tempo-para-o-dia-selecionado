export default class Time{
    constructor(dias,horas,minutos,segundos,modal,modalSub,modalDate,modalForm,modalRelogio){
        this.dia = document.querySelector(dias);
        this.hora = document.querySelector(horas);
        this.minuto = document.querySelector(minutos);
        this.segundo = document.querySelector(segundos);
        //modal
        this.modal = document.querySelector(modal);
        this.modalSub = document.querySelector(modalSub);
        this.modalDate = document.querySelector(modalDate);
        this.modalForm = document.querySelector(modalForm);
        this.modalRelogio = document.querySelector(modalRelogio);
    }

    relogio(diaDate,mesDate,anoDate){
        this.contador = setInterval(function(){
            let hoje = new Date();
            let finalAno = new Date(anoDate,mesDate,diaDate,0,0,0,0);
            
            if(hoje.getTime() == finalAno.getTime()){
                clearInterval(this.contador);
            } else{
                this.timeConta = finalAno.getTime() - hoje.getTime();

                this.dia.innerText = Math.floor(this.timeConta / (24 * 60  * 60 * 1000));
                this.hora.innerText = (Math.floor(this.timeConta / (60 * 60 * 1000)) % 24);
                this.minuto.innerText = (Math.floor(this.timeConta / (60 * 1000)) % 60);
                this.segundo.innerText = (Math.round(this.timeConta / (1000)) % 60);
            }
        },1000);
    }

    aviso(){
        this.spanAviso = document.createElement('span');
        this.spanAviso.classList.add('span');
        this.spanAviso.innerText = 'Data Invalida';
        this.modalForm.insertBefore(this.spanAviso,this.modalDate);
        
        this.condicao();
    }

    condicao(){
        this.modalSub.addEventListener('click',(event)=>{
            event.preventDefault()
        
            let dataSelec = this.modalDate.value
            let arrayDate = dataSelec.split(/\-/g);
        
            let hoje = new Date();
            if(arrayDate == null ||
            arrayDate[0] < hoje.getFullYear() || 
            arrayDate[0] <= hoje.getFullYear() && arrayDate[1] < hoje.getMonth() +1 ||
            arrayDate[0] <= hoje.getFullYear() && arrayDate[1] <= hoje.getMonth() +1 && arrayDate[2] <= hoje.getDate()){
        
                this.spanAviso.classList.add('ativo');
                
            } else{
                this.spanAviso.classList.remove('ativo');
                this.modal.classList.remove('ativo');
                let anoNew = arrayDate[0];
                let mesNew = arrayDate[1];
                let diaNew = arrayDate[2];
                this.relogio(diaNew,mesNew - 1,anoNew);
            }
        })
    }
    
    modalTime(){
        this.modalRelogio.addEventListener('click',()=>{
            this.resetRelogio();
            this.modal.classList.add('ativo');
        })
    }

    resetRelogio(){
        clearInterval(this.contador)
        this.dia.innerText = 0;
        this.hora.innerText = 0;
        this.minuto.innerText = 0;
        this.segundo.innerText = 0;
    }

    initIniciar(){
        this.modalTime();
        this.aviso();
    }
}