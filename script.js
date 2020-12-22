let dia = document.querySelector('#dia');
let hora = document.querySelector('#hora');
let minuto = document.querySelector('#minuto');
let segundo = document.querySelector('#segundo');

function relogio(diaDate,mesDate,anoDate){
    this.diaDate = diaDate;
    this.mesDate = mesDate;
    this.anoDate = anoDate;

    const contador = setInterval(function(){
        const hoje = new Date();
        const finalAno = new Date(this.anoDate,this.mesDate,this.diaDate,00,00,00,00)
        
        const timeConta = finalAno.getTime() - hoje.getTime();

        let hojeDia = Math.floor(timeConta / (24 * 60  * 60 * 1000));
        let hojeHora = Math.floor(timeConta / (60 * 60 * 1000));
        let hojeMinuto = Math.floor(timeConta / (60 * 1000));
        let hojeSegundo = Math.round(timeConta / (1000));

        let hojeHoras = hojeHora % 24;
        let hojeMinutos = hojeMinuto % 60;
        let hojeSegundos = hojeSegundo % 60;

        dia.innerText = hojeDia;
        hora.innerText = hojeHoras;
        minuto.innerText = hojeMinutos;
        segundo.innerText = hojeSegundos;

        if(hoje.getTime() == finalAno.getTime()){
            clearInterval(contador);
        }
    },1000);
}


const modal = document.querySelector('.modal');
const modalSub = document.querySelector('input[type="submit"]');
const modalDate = document.querySelector('#modal');

const modalForm = document.querySelector('.modalForm');

const spanAviso = document.createElement('span')
spanAviso.classList.add('span');
spanAviso.innerText = 'Data Invalida';
modalForm.insertBefore(spanAviso,modalDate);

modalSub.addEventListener('click',(event)=>{
    event.preventDefault()

    let dataSelec = modalDate.value
    const arrayDate = dataSelec.split(/\-/g);

    const hoje = new Date();

    // console.log(arrayDate, 'ArrayDate', hoje.getFullYear(), hoje.getMonth() +1,hoje.getDate());

    if(arrayDate == null ||
    arrayDate[0] < hoje.getFullYear() || 
    arrayDate[0] <= hoje.getFullYear() && arrayDate[1] < hoje.getMonth() +1 ||
    arrayDate[0] <= hoje.getFullYear() && arrayDate[1] <= hoje.getMonth() +1 && arrayDate[2] <= hoje.getDate()){

        spanAviso.classList.add('ativo');
        
    } else{
        spanAviso.classList.remove('ativo');
        modal.classList.remove('ativo');
        [anoNew,mesNew,diaNew] = arrayDate;
        relogio(diaNew,mesNew - 1,anoNew);
    }
})


const modalRelogio = document.querySelector('.modalRelogio');

modalRelogio.addEventListener('click',()=>{
    modal.classList.add('ativo');
})
