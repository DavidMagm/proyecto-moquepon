let ataqueJugador
let enemigoAtaque
let vidasJugador = 3;
let vidasEnemigo = 3;
let innerMoquepones

function iniciarJuego() {
    moquepones.forEach(moquepon => {
        innerMoquepones = `
            <input type="radio" name="mascota" id=${moquepon.nombre} class="mascota-radio">
            <label for=${moquepon.nombre} class="tarjeta-moquepon">
                <p>${moquepon.nombre}</p>
                <img src=${moquepon.img} alt=${moquepon.nombre}>
            </label>
        `
        tarjetaSeleccionarMascota.innerHTML += innerMoquepones
    });
    sectionAtaque.style.display = 'none'
    sectionReinicio.style.display = 'none'
}

function seleccionarMascota() {
    for(let mascota of inputMascotaJugador) {
        if(mascota.checked) {
            nombreMascotaJugador.innerHTML = mascota.id
        }
    }

    sectionAtaque.style.display = 'flex'
    sectionMascota.style.display = 'none'

    seleccionarMascotaEnemigo()
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
function combate() {
    if(ataqueJugador == enemigoAtaque) {
        mensaje('empate')
    }
    else if (ataqueJugador == 'fuego' && enemigoAtaque == 'tierra') {
        mensaje('ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'agua' && enemigoAtaque == 'fuego') {
        mensaje('ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'tierra' && enemigoAtaque == 'agua') {
        mensaje('ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        mensaje('perdiste')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    resivarVidas()
}

function resivarVidas() {
    if(vidasEnemigo == 0) {
        mensajeFinal('Felicidades GANASTE')
    } else if(vidasJugador == 0){
        mensajeFinal('Vuelve a intentarlo PERTISTE')
    }
}

function ataqueFuego() {
    ataqueJugador = 'fuego'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'agua'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'tierra'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let numeroAleatorio = ramdomNumber(1,3)
    if(numeroAleatorio == 1) {
        enemigoAtaque = 'fuego'
    } else if(numeroAleatorio == 2) {
        enemigoAtaque = 'agua'
    } else {
        enemigoAtaque = 'tierra'
    }

    combate()
}

function mensajeFinal(resultadoFinal) {
    mensajeAtaque.innerHTML = resultadoFinal

    buttonAgua.disabled = true
    buttonFuego.disabled = true
    buttonTierra.disabled = true
    sectionReinicio.style.display = 'block'
}

function mensaje(resultado) {
    mensajeAtaque.innerHTML = resultado
    ataqueDelJugador.innerHTML = ataqueJugador
    ataqueDelEnemigo.innerHTML = enemigoAtaque 
}

function reiniciandoJuego() {
    location.reload()
}

// CLASES

class Moquepon {
    constructor(nombre, vidas, img) {
        this.nombre = nombre
        this.vidas = vidas
        this.img = img
    }
}

let tatara = new Moquepon('tatara', 3, '../assects/mokepons_mokepon_capipepo_attack.webp')
let holala = new Moquepon('holala', 3, '../assects/mokepons_mokepon_hipodoge_attack.webp')
let keton = new Moquepon('keton', 3, '../assects/mokepons_mokepon_ratigueya_attack.webp')

let moquepones = [tatara, holala, keton]

const inputMascotaJugador = document.querySelectorAll('.mascota-radio')

let mensajeAtaque = document.getElementById('resultado')
const tarjetaSeleccionarMascota = document.getElementById('tarjeta-seleccionar')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const nombreMascotaJugador = document.getElementById('mascota-jugador')
const nombreMascotaEnemigo = document.getElementById('mascota-enemigo')
const buttonMascotaJugador = document.getElementById('button-mascota')
const buttonFuego = document.getElementById('button-fuego')
const buttonAgua = document.getElementById('button-agua')
const buttonTierra = document.getElementById('button-tierra')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const buttonReiniciar = document.getElementById('button-reiniciar')
const sectionMascota = document.getElementById('seleccionar-mascota')
const sectionAtaque = document.getElementById('seleccionar-ataque')
const sectionReinicio = document.getElementById('reiniciar-juego')
buttonFuego.addEventListener('click', ataqueFuego)
buttonAgua.addEventListener('click', ataqueAgua)
buttonTierra.addEventListener('click', ataqueTierra)
buttonMascotaJugador.addEventListener('click', seleccionarMascota)
buttonReiniciar.addEventListener('click', reiniciandoJuego)

window.addEventListener('load', iniciarJuego)