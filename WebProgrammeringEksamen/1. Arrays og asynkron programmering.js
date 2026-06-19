// Spørgsmål 1.a
const arr = [1, "hej", true, {navn: "Bo"}, () => 42]

arr.push("ekstra")
arr[10] = "sparse"

console.log(arr.length)
console.log(arr[5])

// Spørgsmål 1.b
const tal = [1,2,3,4,5]

const doubled = tal.map(x => x * 2)

const lige = tal.filter(x => x % 2 === 0)

const foreste = tal.find(x => x > 3)

tal.forEach(x => console.log(x))

// Spørgsmål 1.d
setTimeout(() => console.log("1 sekund er gået"), 1000)

function load(url, callback) {
    const minData = { besked: "Her er din data" } 
    callback(minData)
}

load("/api", (data) => console.log(data))

// Spørgsmål 1. e - Promise med then/catch
fetch("/api/brugere")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Fejl:", error))

// Spørgsmål 1.f - Async/await
async function hentBrugere() {
    try {
        const response = await fetch("/api/brugere")
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Fejl:", error)
    }
}
hentBrugere().then(data => console.log(data))

// Spørgmål 1.g - callback hell
getData(function(a) {
    getMore(a, function(b) {
        getMore(b, function(c) {
            })
        })
})

// Spørgmål 1.g.1 - med async/await - fladt, læsbart, et try/catch
async function hentAlt() {
    try {
        const a = await getData()
        const b = await getMore(a)
        const c = await getEvenMore(b)
    } catch (error) {
        console.error("Fejl:", error)
    }
}