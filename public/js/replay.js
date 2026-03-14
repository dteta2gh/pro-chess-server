var replayMoves = []
var replayIndex = 0

async function loadGameList(selectedGameId = null){

    const response = await fetch('../api/get_games.php')
    const games = await response.json()

    const select = document.getElementById("game-list")

    select.innerHTML = ""

    if(!games.length){
        const option = document.createElement("option")
        option.value = ""
        option.text = "No saved games"
        option.disabled = true
        option.selected = true
        select.appendChild(option)
        return
    }

    games.forEach(g => {
        const option = document.createElement("option")
        option.value = g.id
        option.text = "Game " + g.id

        if(selectedGameId && String(g.id) === String(selectedGameId)){
            option.selected = true
        }

        select.appendChild(option)
    })
}

async function loadSelectedGame(){

    const id = document.getElementById("game-list").value

    if(!id) return

    const response = await fetch('../api/get_moves.php?game_id=' + id)
    replayMoves = await response.json()

    replayIndex = 0

    game.reset()
    board.start()

    updateMoveHistory()
    updateTurnStatus()

    const status = document.getElementById("status")
    if(status){
        status.innerText = "Replay loaded"
        status.className = ""
    }
}

function nextReplayMove(){

    if(replayIndex >= replayMoves.length) return

    const move = replayMoves[replayIndex]

    game.move(move)

    board.position(game.fen())

    replayIndex++

    updateMoveHistory()
    updateTurnStatus()

    if(checkGameEnd()) return
}

function resetReplay(){

    replayIndex = 0

    game.reset()

    board.start()

    updateMoveHistory()
    updateTurnStatus()

    const status = document.getElementById("status")
    if(status){
        status.innerText = "Replay reset"
        status.className = ""
    }
}