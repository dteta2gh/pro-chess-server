var board
var game = new Chess()

var replayMoves = []
var replayIndex = 0
var replayGameId = null

function initReplayPage(){

    board = Chessboard('board', {
        draggable: false,
        position: 'start'
    })

    if(replayGameId){
        loadReplayGameById(replayGameId)
    }
}

async function loadReplayGameById(id){

    const response = await fetch('../api/get_moves.php?game_id=' + id)
    replayMoves = await response.json()

    replayIndex = 0

    updateReplayStatus()
    updateReplayHistory()

    game.reset()
    board.start()
}

function updateReplayStatus(){

    const status = document.getElementById("status")
    if(!status) return

    status.innerText =
        "Replay Game " + replayGameId +
        " — Move " + replayIndex +
        " / " + replayMoves.length
}

function updateReplayHistory(){

    let html = ""

    for(let i = 0; i < replayMoves.length; i += 2){

        let moveNumber = (i / 2) + 1
        let whiteMove = replayMoves[i] || ""
        let blackMove = replayMoves[i + 1] || ""

        html += `
            <div class="move-row">
                <div class="move-num">${moveNumber}.</div>
                <div class="move-cell white-cell">
                    <span class="move-text">${whiteMove}</span>
                </div>
                <div class="move-cell black-cell">
                    <span class="move-text">${blackMove}</span>
                </div>
            </div>
        `
    }

    document.getElementById("move-history").innerHTML = html
}

function rebuildReplayPosition(){

    game.reset()

    for(let i = 0; i < replayIndex; i++){
        game.move(replayMoves[i])
    }

    board.position(game.fen())
    updateReplayStatus()
}

function nextReplayMove(){

    if(replayIndex >= replayMoves.length) return

    replayIndex++
    rebuildReplayPosition()
}

function prevReplayMove(){

    if(replayIndex <= 0) return

    replayIndex--
    rebuildReplayPosition()
}

function replayStart(){

    replayIndex = 0
    rebuildReplayPosition()
}

function replayEnd(){

    replayIndex = replayMoves.length
    rebuildReplayPosition()
}

window.onload = initReplayPage