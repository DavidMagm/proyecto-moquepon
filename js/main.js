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
window.addEventListener('keydown', moverConFlecha)
window.addEventListener('keyup', detenerMovimiento);

for(let button of buttonMover) {
    button.addEventListener('mouseup', detenerMovimiento)
}

let jugadorId = null
let enemigoId = null
let ataqueJugador = []
let enemigoAtaque = []
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let innerMoquepones;
let moquepones = []
let moqueponesEnemigos = []
let buttonAgua;
let buttonFuego;
let buttonTierra;
let botones = [];
let innerAtaques;
let mascotaJugador;
let mascotaJugadorObjeto;
let mascotaEnemigoAtaque;
let indexAtaqueJugador;
let indexAtaqueEnmigo;
let ataques = [];
let inputMascotaJugador
let lienzo = mapa.getContext('2d')
let intervalo;
let mapaBackground = new Image()
mapaBackground.src = '/Ubuntu/home/davidco/javascript/moquepon/assects/mokemap.png'
let mapaAncho = window.innerWidth - 20
let mapaAnchoMax = 350
if(mapaAncho > mapaAnchoMax) {
    mapaAncho = mapaAnchoMax - 20
}
let mapaAlto = mapaAncho * 600 / 800

mapa.width = mapaAncho
mapa.height = mapaAlto

// CLASES

class Moquepon {
    constructor(nombre, vidas, img, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.vidas = vidas
        this.img = img
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = ramdomNumber(0, mapa.width - this.ancho)
        this.y = ramdomNumber(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMoquepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

const TATARA_ATAQUES = [
    {nombre:'💧',id:'botton-agua'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'🌱',id:'botton-tierra'}
]

let tatara = new Moquepon('tatara', 3, '/Ubuntu/home/davidco/javascript/moquepon/assects/mokepons_mokepon_capipepo_attack.webp', '/Ubuntu/home/davidco/javascript/moquepon/assects/capipepo.png')
tatara.ataques.push(...TATARA_ATAQUES)

const HOLALA_ATAQUE = [
    {nombre:'🌱',id:'botton-tierra'},
    {nombre:'🌱',id:'botton-tierra'},
    {nombre:'🌱',id:'botton-tierra'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'🔥',id:'botton-fuego'}
]
let holala = new Moquepon('holala', 3, '/Ubuntu/home/davidco/javascript/moquepon/assects/mokepons_mokepon_hipodoge_attack.webp', '/Ubuntu/home/davidco/javascript/moquepon/assects/hipodoge.png')
holala.ataques.push(...HOLALA_ATAQUE)

const KETON_ATAQUE = [
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'🔥',id:'botton-fuego'},
    {nombre:'💧',id:'botton-agua'},
    {nombre:'🌱',id:'botton-tierra'}
]

let keton = new Moquepon('keton', 3, '/Ubuntu/home/davidco/javascript/moquepon/assects/mokepons_mokepon_ratigueya_attack.webp', '/Ubuntu/home/davidco/javascript/moquepon/assects/ratigueya.png')
keton.ataques.push(...KETON_ATAQUE)

moquepones.push(tatara,holala,keton)



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

    unirseJuego()
}

function unirseJuego() {
    fetch('http://localhost:8080/unirse')
        .then(res => {
            if(res.ok) {
                res.text()
                    .then(respuesta => {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function iniciarMapa() {

    intervalo = setInterval(pintarCanvas, 50);
    mascotaJugadorObjeto = obtenerMascotaObjeto()

}

function seleccionarMascota() {
    inputMascotaJugador = document.querySelectorAll('.mascota-radio')
    for(let mascota of inputMascotaJugador) {
        if(mascota.checked) {
            nombreMascotaJugador.innerHTML = mascota.id
            mascotaJugador = mascota.id
        }
    }

    seleccionarMoquepon(mascotaJugador)

    sectionVerMapa.style.display = 'flex'
    sectionMascota.style.display = 'none'
    iniciarMapa()
    extraerAtaque(mascotaJugador)
}

function seleccionarMoquepon(mascotaJugador) {
    fetch(`http://localhost:8080/moquepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            moquepon: mascotaJugador
        })
    })
}

function ramdomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo(enemigo) {
    let numeroAleatorio = ramdomNumber(1, moquepones.length -1)
    
    nombreMascotaEnemigo.innerHTML = enemigo.nombre
    mascotaEnemigoAtaque = enemigo.ataques
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
            if(ataqueJugador.length == 5) {
                enviarAtaques()
            }
        }) 
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/moquepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/moquepon/${enemigoId}/ataques`)
        .then(res => {
            if(res.ok) {
                res.json()
                    .then(function({ataques}) {
                        if(ataques.length == 5) {
                            enemigoAtaque = ataques
                            combate()
                        }
                    })
            }
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

function obtenerMascotaObjeto() {
    for(let i = 0; i < moquepones.length; i++) {
        if(mascotaJugador == moquepones[i].nombre) {
            return moquepones[i]
        }
    }
}

function combate() {
    clearInterval(intervalo)
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

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMoquepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    moqueponesEnemigos.forEach(function(moquepon) {
        moquepon.pintarMoquepon()
        revisarColision(moquepon)
    })

}

function enviarPosicion(x,y) {
    fetch(`http://localhost:8080/moquepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({enemigos}) {
                        console.log(enemigos)
                        moqueponesEnemigos = enemigos.map(function (enemigo) {
                            const moqueponNombre = enemigo.moquepon.nombre || ""
                            let moqueponEnemigo = null
                            if(moqueponNombre == 'holala') {
                                moqueponEnemigo = new Moquepon('holala', 3, '/Ubuntu/home/davidco/javascript/moquepon/assects/mokepons_mokepon_hipodoge_attack.webp', '/Ubuntu/home/davidco/javascript/moquepon/assects/hipodoge.png',enemigo.id)
                            } else if(moqueponNombre == 'keton') {
                                moqueponEnemigo = new Moquepon('keton', 3, '/Ubuntu/home/davidco/javascript/moquepon/assects/mokepons_mokepon_ratigueya_attack.webp', '/Ubuntu/home/davidco/javascript/moquepon/assects/ratigueya.png', enemigo.id)
                            } else if(moqueponNombre == 'tatara') {
                                moqueponEnemigo = new Moquepon('tatara', 3, '/Ubuntu/home/davidco/javascript/moquepon/assects/mokepons_mokepon_capipepo_attack.webp', '/Ubuntu/home/davidco/javascript/moquepon/assects/capipepo.png',enemigo.id)
                            }
                            moqueponEnemigo.x = enemigo.x
                            moqueponEnemigo.y = enemigo.y

                            return moqueponEnemigo
                        })
                    })
            }
        })
}

function moverPersonajeArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverPersonajeDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverPersonajeIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverPersonajeAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function moverConFlecha(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverPersonajeArriba()
            break;
        case 'ArrowDown':
            moverPersonajeAbajo()
            break
        case 'ArrowLeft':
            moverPersonajeIzquierda()
            break
        case 'ArrowRight': 
            moverPersonajeDerecha()
            break
        default:
            break;
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}



window.addEventListener('load', iniciarJuego)