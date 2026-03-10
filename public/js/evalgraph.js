var evalHistory = []

function addEval(score){

// limit score range
const MAX = 1000

score = Math.max(-MAX, Math.min(MAX, score))

evalHistory.push(score)

drawEvalGraph()

}

function drawEvalGraph(){

let graph = document.getElementById("eval-graph")

graph.innerHTML = ""

let w = graph.clientWidth
let h = graph.clientHeight

let step = w / Math.max(evalHistory.length-1,1)

let path = ""

for(let i=0;i<evalHistory.length;i++){

let x = i * step

let y = h/2 - (evalHistory[i]/1000)*(h/2)

path += x+","+y+" "

}

let svg = `
<svg width="${w}" height="${h}">
<polyline
fill="none"
stroke="#00ff88"
stroke-width="2"
points="${path}"
/>
</svg>
`

graph.innerHTML = svg

}