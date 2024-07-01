let mensajeAtaque = document.getElementById('resultado')
let sectionMascotaAtaque = document.getElementById('section-button-ataque')
const tarjetaSeleccionarMascota = document.getElementById('tarjeta-seleccionar')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const nombreMascotaJugador = document.getElementById('mascota-jugador')
const nombreMascotaEnemigo = document.getElementById('mascota-enemigo')
const buttonMascotaJugador = document.getElementById('button-mascota')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const buttonReiniciar = document.getElementById('button-reiniciar')
const sectionMascota = document.getElementById('seleccionar-mascota')
const sectionAtaque = document.getElementById('seleccionar-ataque')
const sectionReinicio = document.getElementById('reiniciar-juego')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const moverArriba = document.getElementById('mover-arriba')
const moverDerecha = document.getElementById('mover-derecha')
const moverIzquierda = document.getElementById('mover-izquierda')
const moverAbajo = document.getElementById('mover-abajo')
const buttonMover = document.querySelectorAll('.button-mover')
moverArriba.addEventListener('mousedown', moverPersonajeArriba)
moverDerecha.addEventListener('mousedown', moverPersonajeDerecha)
moverIzquierda.addEventListener('mousedown', moverPersonajeIzquierda)
moverAbajo.addEventListener('mousedown', moverPersonajeAbajo)
buttonMascotaJugador.addEventListener('mousedown', seleccionarMascota)
buttonReiniciar.addEventListener('mousedown', reiniciandoJuego)

for(let button of buttonMover) {
    button.addEventListener('mouseup', detenerMovimiento)
}


let ataqueJugador = []
let enemigoAtaque = []
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let innerMoquepones;
let moquepones = []
let buttonAgua;
let buttonFuego;
let buttonTierra;
let botones = [];
let innerAtaques;
let mascotaJugador;
let mascotaEnemigoAtaque;
let indexAtaqueJugador;
let indexAtaqueEnmigo;
let ataques = [];
let inputMascotaJugador
let lienzo = mapa.getContext('2d')
let intervalo;

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
    sectionVerMapa.style.display = 'none'
}

function seleccionarMascota() {
    inputMascotaJugador = document.querySelectorAll('.mascota-radio')
    for(let mascota of inputMascotaJugador) {
        if(mascota.checked) {
            nombreMascotaJugador.innerHTML = mascota.id
            mascotaJugador = mascota.id
        }
    }

    //sectionAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'
    sectionMascota.style.display = 'none'
    intervalo = setInterval(pintarPersonaje, 50);
    extraerAtaque(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function ramdomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {
    let numeroAleatorio = ramdomNumber(1, moquepones.length -1)
    
    nombreMascotaEnemigo.innerHTML = moquepones[numeroAleatorio].nombre
    mascotaEnemigoAtaque = moquepones[numeroAleatorio].ataques
    secuenciaAtaque()
}

function extraerAtaque(mascotaJugador) {
    for(let i = 0; i < moquepones.length; i++) {
        if(mascotaJugador == moquepones[i].nombre) {
console.log(mascotaJugador)

            ataques = moquepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach(ataque => {
        innerAtaques = `
            <button id=${ataque.id} class="button-ataque">${ataque.nombre}</button>
        `
        sectionMascotaAtaque.innerHTML += innerAtaques

    })
    buttonFuego = document.getElementById('button-fuego')
    buttonAgua = document.getElementById('button-agua')
    buttonTierra = document.getElementById('button-tierra')
    botones = document.querySelectorAll('.button-ataque')
}

function secuenciaAtaque() {
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent == '🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            else if (e.target.textContent == '💧') {
                ataqueJugador.push('AGUA')
                boton.disabled = true
                boton.style.background = '#112f58'
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    let numeroAleatorio = ramdomNumber(0,mascotaEnemigoAtaque.length -1)
    if(numeroAleatorio == 0 || numeroAleatorio == 1) {
        enemigoAtaque.push('FUEGO')
    } else if(numeroAleatorio == 3 || numeroAleatorio == 4) {
        enemigoAtaque.push('AGUA')
    } else {
        enemigoAtaque.push('TIERRA')
    }

    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()
    }
}

function indexAtaque(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnmigo = enemigoAtaque[enemigo]
}

function combate() {

    for(let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] == enemigoAtaque[i]) {
            indexAtaque(i, i)
            mensaje('EMPATE')
        }
        else if (ataqueJugador[i] == 'FUEGO' && enemigoAtaque[i] == 'TIERRA') {
            indexAtaque(i,i)
            mensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] == 'AGUA' && enemigoAtaque[i] == 'FUEGO') {
            indexAtaque(i,i)
            mensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] == 'TIERRA' && enemigoAtaque[i] == 'AGUA') {
            indexAtaque(i,i)
            mensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAtaque(i,i)
            mensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        resivarVictorias()
    }
    

    
}

function resivarVictorias() {
    if(victoriasJugador == victoriasEnemigo) {
        mensajeFinal('Esto es un empate')
    } else if(victoriasEnemigo < victoriasJugador){
        mensajeFinal('Felicidades GANASTE')
    } else {
        mensajeFinal('Vuelve a intentarlo PERTISTE')
    }
}

// function ataqueFuego() {
//     ataqueJugador = 'fuego'
//     ataqueAleatorioEnemigo()
// }
// function ataqueAgua() {
//     ataqueJugador = 'agua'
//     ataqueAleatorioEnemigo()
// }
// function ataqueTierra() {
//     ataqueJugador = 'tierra'
//     ataqueAleatorioEnemigo()
// }

function mensajeFinal(resultadoFinal) {
    mensajeAtaque.innerHTML = resultadoFinal
    sectionReinicio.style.display = 'block'
}

function mensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemgio = document.createElement('p')
    mensajeAtaque.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemgio.innerHTML = indexAtaqueEnmigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemgio)
}

function reiniciandoJuego() {
    location.reload()
}

function pintarPersonaje() {
    holala.x = holala.x + holala.velocidadX
    holala.y = holala.y + holala.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        holala.mapaFoto,
        holala.x,
        holala.y,
        holala.ancho,
        holala.alto
    )
}

function moverPersonajeArriba() {
    holala.velocidadY = -5
}

function moverPersonajeDerecha() {
    holala.velocidadX = 5
}

function moverPersonajeIzquierda() {
    holala.velocidadX = -5
}

function moverPersonajeAbajo() {
    holala.velocidadY = 5
}

function detenerMovimiento() {
    holala.velocidadX = 0
    holala.velocidadY = 0
}
// CLASES

class Moquepon {
    constructor(nombre, vidas, img) {
        this.nombre = nombre
        this.vidas = vidas
        this.img = img
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = img
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let tatara = new Moquepon('tatara', 3, '../assects/mokepons_mokepon_capipepo_attack.webp')
tatara.ataques.push(
    {nombre:'💧',id:'botton-agua'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'🌱',id:'botton-tierra'}
)
let holala = new Moquepon('holala', 3, '../assects/mokepons_mokepon_hipodoge_attack.webp')
holala.ataques.push(
    {nombre:'🌱',id:'botton-tierra'},
    {nombre:'🌱',id:'botton-tierra'},
    {nombre:'🌱',id:'botton-tierra'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'🔥',id:'botton-fuego'}
)
let keton = new Moquepon('keton', 3, '../assects/mokepons_mokepon_ratigueya_attack.webp')
keton.ataques.push(
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'🌱',id:'botton-tierra'}
)

moquepones.push(tatara,holala,keton)





window.addEventListener('load', iniciarJuego)