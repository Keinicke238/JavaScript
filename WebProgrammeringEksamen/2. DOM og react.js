// Spørgsmål 2.a - click event
const knap = document.getElementById("min-knap")
knap.addEventListener("click", function(event){
    console.log("Klikket!", event.target)
})

// Spørgsmål 2.c - submit event + preventDefault
const form = document.getElementById("minForm")
form.addEventListener("submit", function(event){
    event.preventDefault()
    const navn = document.getElementById("navn").value
    console.log("Indsendt navn:", navn)
})

// Spørgsmål 2.h.a - komponent med JSX, props og state
import {useState} from "react"

function Tæller({titel}) {
    const [antal, setAntal] = useState(0)

    return (
        <div>
            <h2>{titel}</h2>
            <p>Antal: {antal}</p>
            <button onClick={() => setAntal(antal + 1)}>
            Tæl op
        </button>
        </div>
    )
}

// Spørgsmål 2.h.b - anvendelse af komponenten
function App() {
    return (
        <div>
            <Tæller titel="Min Tæller" />
            <Tæller titel = "En anden tæller"/>
        </div>
    )
}