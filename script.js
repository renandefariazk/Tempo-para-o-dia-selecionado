import Time from "./module/time.js"

const time = new Time('#dia','#hora','#minuto','#segundo','.modal','input[type="submit"]','#modal','.modalForm','.modalRelogio');

time.initIniciar();