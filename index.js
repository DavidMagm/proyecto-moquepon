const express = require("express")
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMoquepon(moquepon) {
        this.moquepon = moquepon
    }
}

class Moquepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}
app.get('/unirse', (req,res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(id)
})

app.post('/moquepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombreMoquepon = req.body.moquepon || ""
    const moquepon = new Moquepon(nombreMoquepon)
    let jugadorIndex = jugadores.findIndex(jugador => jugadorId == jugador.id)

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMoquepon(moquepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    console.log('index: ' + jugadorIndex)
    res.end()
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})
