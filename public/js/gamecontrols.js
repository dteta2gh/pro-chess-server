function newGame(){

game.reset()

board.start()

whiteTime = 600
blackTime = 600

updateMoveHistory()
updateClocks()

// reset evaluation bar
updateEval(0)

// reset evaluation graph
if(typeof evalHistory !== "undefined"){
evalHistory = []
drawEvalGraph()
}

// reset engine
if(typeof resetEngine === "function"){
resetEngine()
}

}

function resign(){

alert("You resigned. Game over.")

newGame()

}

function exportPGN(){

let pgn = game.pgn()

let blob = new Blob([pgn], {type:"text/plain"})

let a = document.createElement("a")

a.href = URL.createObjectURL(blob)

a.download = "game.pgn"

a.click()

}