// Spørgsmål 3.a - typesvagt sprog
let x = 42
x = "nu er jeg en streng" 
x = true 

console.log("5" + 1)
console.log("5" - 1)
console.log(null + 1)
console.log(undefined + 1)

// Spørgsmål 3.b - Objekt literal
const person = {
    navn: "Bo",
    alder: 25,
    hilsen: function() {
        return "Hej, jeg hedder" + this.navn
    }
}

console.log(person.navn)
console.log(person.hilsen())
person.email = "bo@mail.dk"

// Spørgsmål 3.c - prototype-baseret "klasse"
function Person(navn, alder){
    this.navn = navn
    this.alder = alder
}
Person.prototype.hilsen = function () {
    return "Hej, jeg hedder" + this.navn
}
const bo = new Person("Bo", 25)
console.log(bo.hilsen())

// Spørgsmål 3. f - Klasse i TypeScript
class Person {
    navn: string
    alder: number

    constructor(navn: string, alder: number){
        this.navn = navn
        this.alder = alder
    }

    hilsen(): string {
        return "Hej, jeg hedder" + this.navn
    }
}

const bo = new Person("Bo", 25)
console.log(bo.hilsen())

const fejl = new Person (42, "Bo")