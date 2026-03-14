function newGame(){

    stopClock()

    game.reset()

    board.start()

    whiteTime = 600
    blackTime = 600

    updateMoveHistory()
    updateClocks()

    clearArrows()
    removeHighlights()

    updateEval(0)
    lastEval = 0

    if(typeof evalHistory !== "undefined"){
        evalHistory = []
        drawEvalGraph()
    }

    if(typeof moveQualities !== "undefined"){
        moveQualities = []
    }

    if(typeof resetEngine === "function"){
        resetEngine()
    }

    currentGameId = null
    gameStarted = false

    updateTurnStatus()
	
	const status = document.getElementById("status")
	if(status){
		status.innerText = "Press Begin Game"
		status.className = ""
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

function checkGameEnd(){

    const status = document.getElementById("status")

    clearCheckHighlight()

    if(game.in_checkmate()){
        status.innerText = "Checkmate!"
        status.className = "status-mate"
        return true
    }

    if(game.in_stalemate()){
        status.innerText = "Draw by stalemate"
        status.className = "status-draw"
        return true
    }

    if(game.insufficient_material()){
        status.innerText = "Draw by insufficient material"
        status.className = "status-draw"
        return true
    }

    if(game.in_threefold_repetition()){
        status.innerText = "Draw by repetition"
        status.className = "status-draw"
        return true
    }

    if(game.in_draw()){
        status.innerText = "Draw"
        status.className = "status-draw"
        return true
    }

    return false
}

function updateTurnStatus(){

    if(game.game_over()) return

    const status = document.getElementById("status")

    if(game.in_check()){
        status.innerText = "Check!"
        status.className = "status-check"
        highlightCheckKing()
        return
    }

    clearCheckHighlight()

    if(game.turn() === 'w'){
        status.innerText = "White to move"
    }else{
        status.innerText = "Black to move"
    }

    status.className = ""
}

async function beginGame(){

    playerSide = document.getElementById("playerSide").value

    newGame()

    await createGameRecord()

    initClock()
    startClock()

    gameStarted = true

    if(playerSide === 'b'){
        board.orientation('black')

        if(autoStockfish){
            setTimeout(playStockfish, 300)
        }
    }else{
        board.orientation('white')
    }

    updateTurnStatus()
}

function changeSide(){

    playerSide = (playerSide === 'w') ? 'b' : 'w'

    const sideSelect = document.getElementById("playerSide")
    if(sideSelect){
        sideSelect.value = playerSide
    }

    if(playerSide === 'w'){
        board.orientation('white')
    }else{
        board.orientation('black')
    }
}

async function createGameRecord(){

    const whitePlayer = (playerSide === 'w') ? 1 : 0
    const blackPlayer = (playerSide === 'w') ? 0 : 1

    const response = await fetch('../api/create_game.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
            'white_player=' + encodeURIComponent(whitePlayer) +
            '&black_player=' + encodeURIComponent(blackPlayer) +
            '&fen=' + encodeURIComponent(game.fen()) +
            '&pgn=' + encodeURIComponent(game.pgn()) +
            '&status=' + encodeURIComponent('active')
    })

    const data = await response.json()

    currentGameId = data.game_id

    console.log("Created game:", currentGameId)

    if(typeof loadGameList === "function"){
        loadGameList(currentGameId)
    }
}

async function saveMoveRecord(moveText){

    if(!currentGameId) return

    const response = await fetch('../api/save_move.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
            'game_id=' + encodeURIComponent(currentGameId) +
            '&move=' + encodeURIComponent(moveText) +
            '&fen=' + encodeURIComponent(game.fen())
    })

    const data = await response.json()

    console.log("Saved move:", data)
}

async function updateGameRecord(){

    if(!currentGameId) return

    let status = game.game_over() ? 'finished' : 'active'

    const response = await fetch('../api/update_game.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
            'game_id=' + encodeURIComponent(currentGameId) +
            '&fen=' + encodeURIComponent(game.fen()) +
            '&pgn=' + encodeURIComponent(game.pgn()) +
            '&status=' + encodeURIComponent(status)
    })

    const data = await response.json()

    console.log("Updated game:", data)
}