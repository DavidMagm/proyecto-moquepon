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
}

const inputMascotaJugador = document.querySelectorAll('.mascota-radio')

const nombreMascotaJugador = document.getElementById('mascota-jugador')
const nombreMascotaEnemigo = document.getElementById('mascota-enemigo')
const buttonMascotaJugador = document.getElementById('button-mascota')
buttonMascotaJugador.addEventListener('click', seleccionarMascota)
