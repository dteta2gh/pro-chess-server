var board
var game = new Chess()

function initGame(){

initBoard()

initClock()

updateMoveHistory()

updateClocks()

}

window.onload = initGame