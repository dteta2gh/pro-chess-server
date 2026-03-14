var arrowLayer = null

function drawBestMoveArrow(move){

clearArrows()

const boardElement = document.querySelector("#board")

arrowLayer = document.createElement("div")
arrowLayer.style.position = "absolute"
arrowLayer.style.top = "0"
arrowLayer.style.left = "0"
arrowLayer.style.width = "100%"
arrowLayer.style.height = "100%"
arrowLayer.style.pointerEvents = "none"
arrowLayer.style.zIndex = "2"

boardElement.appendChild(arrowLayer)

const from = move.substring(0,2)
const to = move.substring(2,4)

const fromSquare = document.querySelector(".square-" + from)
const toSquare = document.querySelector(".square-" + to)

if(!fromSquare || !toSquare) return

const fromRect = fromSquare.getBoundingClientRect()
const toRect = toSquare.getBoundingClientRect()
const boardRect = boardElement.getBoundingClientRect()

const x1 = fromRect.left + fromRect.width/2 - boardRect.left
const y1 = fromRect.top + fromRect.height/2 - boardRect.top
const x2 = toRect.left + toRect.width/2 - boardRect.left
const y2 = toRect.top + toRect.height/2 - boardRect.top

const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
svg.setAttribute("width","100%")
svg.setAttribute("height","100%")

const line = document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x1)
line.setAttribute("y1",y1)
line.setAttribute("x2",x2)
line.setAttribute("y2",y2)

line.setAttribute("stroke","#00ff00")
line.setAttribute("stroke-width","6")
line.setAttribute("stroke-linecap","round")
line.setAttribute("opacity","0.7")

svg.appendChild(line)
arrowLayer.appendChild(svg)

}

function clearArrows(){

if(arrowLayer){
arrowLayer.remove()
arrowLayer = null
}

}