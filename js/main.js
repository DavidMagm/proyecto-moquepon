let ataqueJugador
let enemigoAtaque
function seleccionarMascota() {
    for(let mascota of inputMascotaJugador) {
        if(mascota.checked) {
            nombreMascotaJugador.innerHTML = mascota.id
        }
    }
}

function ramdomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {
    let numeroAleatorio = ramdomNumber(1,3)
    if(numeroAleatorio == 1) {
        nombreMascotaEnemigo.innerHTML = 'tatara'
    } else if(numeroAleatorio == 2) {
        nombreMascotaEnemigo.innerHTML = 'holala'
    } else {
        nombreMascotaEnemigo.innerHTML = 'keton'
    }

    combate()
}
function combate() {
    if(ataqueJugador == enemigoAtaque) {
        mensaje('empate')
    }
    else if (ataqueJugador == 'fuego' && enemigoAtaque == 'tierra') {
        mensaje('ganaste')
    } else if (ataqueJugador == 'agua' && enemigoAtaque == 'fuego') {
        mensaje('ganaste')
    } else if (ataqueJugador == 'tierra' && enemigoAtaque == 'agua') {
        mensaje('ganaste')
    } else {
        mensaje('perdiste')
    }
}

function ataqueFuego() {
    ataqueJugador = 'fuego'
}
function ataqueAgua() {
    ataqueJugador = 'agua'
}
function ataqueTierra() {
    ataqueJugador = 'tierra'
}

function ataqueEnemigo() {
    let numeroAleatorio = ramdomNumber(1,3)
    if(numeroAleatorio == 1) {
        enemigoAtaque = 'fuego'
    } else if(numeroAleatorio == 2) {
        enemigoAtaque = 'agua'
    } else {
        enemigoAtaque = 'tierra'
    }
}

function mensaje(resultado) {
    mensajeAtaque.innerHTML `tu mascota elegio ${ataqueJugador} y el enemigo ${enemigoAtaque} - ${resultado}`
}
const inputMascotaJugador = document.querySelectorAll('.mascota-radio')

const mensajeAtaque = document.getElementById('mensaje, p')
const nombreMascotaJugador = document.getElementById('mascota-jugador')
const nombreMascotaEnemigo = document.getElementById('mascota-enemigo')
const buttonMascotaJugador = document.getElementById('button-mascota')
const buttonFuego = document.getElementById('button-fuego')
const buttonAgua = document.getElementById('button-agua')
const buttonTierra = document.getElementById('button-tierra')
buttonFuego.addEventListener('click', ataqueFuego)
buttonAgua.addEventListener('click', ataqueAgua)
buttonTierra.addEventListener('click', ataqueTierra)
buttonMascotaJugador.addEventListener('click', seleccionarMascota)
