// Spørgsmål 6.c.a
fetch("/api/personer")
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err))

// Spørgsmål 6.c.b
fetch("/api/personer", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({navn: "Bo", alder: 25})
})

.then(res => res.json())
.then(data => console.log("Oprettet:", data))
.catch(err => console.error(err))

// Spørgsmål 6.g.a
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

// Spørgsmål 6.g.b
function App() {
    return (
        <div>
            <Tæller titel="Min Tæller" />
            <Tæller titel = "En anden tæller"/>
        </div>
    )
}