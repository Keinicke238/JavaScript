// Spørgsmål 2.a
const knap = document.getElementById("min-knap")
knap.addEventListener("click", function(event){
    console.log("Klikket!", event.target)
})

//2.a.1
function simpelHilsen() {
    console.log("Klikket via HTML inline!");
}

const propKnap = document.getElementById("property-knap");
propKnap.onclick = function(event) {
    console.log("Klikket via DOM property!", event.target);
};

const liste = document.getElementById("min-liste");
liste.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        console.log("Klikket på listepunkt:", event.target.textContent);
    }
});

// Spørgsmål 2.c
const form = document.getElementById("minForm")
form.addEventListener("submit", function(event){
    event.preventDefault()
    const navn = document.getElementById("navn").value
    console.log("Indsendt navn:", navn)
})

// Spørgsmål 2.h.a 
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