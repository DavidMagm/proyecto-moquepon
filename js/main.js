function seleccionarMascota() {
    for(let mascota of inputMascotaJugador) {
        if(mascota.checked) {
            nombreMascotaJugador.innerHTML = mascota.id
        }
    }
}

const inputMascotaJugador = document.querySelectorAll('.mascota-radio')

const nombreMascotaJugador = document.getElementById('mascota-jugador')
const buttonMascotaJugador = document.getElementById('button-mascota')
buttonMascotaJugador.addEventListener('click', seleccionarMascota)
