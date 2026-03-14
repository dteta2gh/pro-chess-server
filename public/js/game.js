var board
var game = new Chess()

var currentGameId = null
var playerSide = 'w'
var gameStarted = false
var autoStockfish = true
var clockRunning = false

function initGame(){

    initBoard()

    updateMoveHistory()

    updateClocks()
	
	loadGameList()

}

window.onload = initGame