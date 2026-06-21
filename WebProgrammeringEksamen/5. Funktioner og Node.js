// Spørgsmål 5.a.1
function udfør(tal, operation){
    return operation(tal)
}

const resultat = udfør(5, x => x * x)
console.log(resultat)

// Spørgsmål 5.a.2
function lavMultiplikator(faktor){
    return function(tal){
        return tal * faktor
    }
}

const gangeMed3 = lavMultiplikator(3)
console.log(gangeMed3(10))

// Spørgsmål 5.b
const gangeMed2 = (x) => x*2
console.log(gangeMed2(5))

const tal = [1, 2, 3]
const dobbelt = tal.map(x => x * 2)
console.log(dobbelt)

// Spørgsmål 5.e
const express = require("express")
const app = express()

app.use(express.json())

const personer = [{id: 1, navn: "Bo"}]

app.get("/personer", (req, res) => {
    res.json(personer)
})

app.post("/personer", (req, res) => {
    const nyPerson = { id: personer.length + 1, navn: req.body.navn}
    personer.push(nyPerson)
    res.status(201).json(nyPerson)
})
app.listen(3000, () => console.log("Server kører på port 3000"))