//Spørgsmål 4.a - simpel callback
function hentData(callback){
    setTimeout(function() {
        const data = {navn: "Bo", alder: 25}
        callback(data)
    }, 1000)
}

hentData(function(data){
    console.log("Data modtaget:", data.navn)
})

// Spørgsmål 4.b - ES6 class
class Person{
    constructor(navn, alder){
        this.navn = navn
        this.alder = alder
    }
    hilsen() {
        return "Hej, jeg hedder " + this.navn
    }
}

class Studerende extends Person {
    constructor(navn, alder, studie){
        super(navn, alder)
        this.studie = studie
    }
}
const bo = new Studerende("Bo", 25, "Datamatiker")
console.log(bo.hilsen())

//Spørgsmål 4.e - Mongoose schema og persistering
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/testdb")
const personSchema = new mongoose.Schema({
    navn: {type: String, required: true},
    alder: {type: Number}
})

const Person = mongoose.model("Person", personSchema)

async function gemPerson() {
    const bo = new Person ({navn: "Bo", alder: 25})
    await bo.save()
    console.log("Person gemt:", bo)
}

async function hentAlle() {
    const personer = await Person.find()
    console.log(personer)
}
gemPerson()
hentAlle()