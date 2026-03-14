var lastEval = 0

const engine = new Worker("js/stockfish.js")

engine.postMessage("uci")
engine.postMessage("isready")

engine.onmessage = function(event){

let line = event.data

if(line.includes("score cp")){

	let score = parseInt(line.split("score cp ")[1])

	updateEvalBar(score/100)

	}

}

function playStockfish(){

if(game.game_over()) return

fetch('../api/stockfish_move.php',{

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({
fen:game.fen(),
elo:document.getElementById("engineLevel").value
})

})

.then(res=>res.json())

.then(data=>handleEngineResponse(data))

.catch(err=>console.error("Stockfish error:",err))

}


// engine move(Black)
var lastEval = 0

function handleEngineResponse(data){

    console.log("Stockfish:", data)

    if(data.eval !== undefined){

        let quality = classifyMove(lastEval, data.eval, 'b')
		
        console.log("Black quality:", quality, "eval:", data.eval)		

        updateEval(data.eval)
        addEval(data.eval)

        if(data.move){
			
			drawBestMoveArrow(data.move)

			playEngineMove(data.move)

			setMoveQuality(game.history().length - 1, quality)

			updateMoveHistory()
        }

        //updateMoveQuality(quality)
        lastEval = data.eval
    }
}

function playEngineMove(move){

    let m = game.move({
        from: move.substring(0,2),
        to: move.substring(2,4),
        promotion:'q'
    })

    highlightLastMove(m)

    board.position(game.fen())
    updateMoveHistory()
    updateTurnStatus()

    let moveText = m.san ? m.san : (m.from + m.to)
    saveMoveRecord(moveText)
	updateGameRecord()

    checkGameEnd()
}

function resetEngine(){

fetch('../api/stockfish_reset.php',{
    method:'POST',
    cache:'no-store'
})
.then(response => response.json())
.then(data => {
    console.log("Engine reset:", data)
})
.catch(err => {
    console.log("Engine reset failed:", err)
})

}
function startEvaluation(){

if(!engine) return

engine.postMessage("stop")

engine.postMessage("position fen " + game.fen())

engine.postMessage("go depth 12")

}

function evaluatePosition(sideJustMoved){

    fetch('../api/stockfish_move.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            fen: game.fen(),
            elo: document.getElementById("engineLevel").value
        })
    })
    .then(response => response.json())
    .then(data => {

        if(data.eval === undefined) return

        let quality = classifyMove(lastEval, data.eval, sideJustMoved)

        updateEval(data.eval)
        addEval(data.eval)
        updateMoveQuality(quality)

        lastEval = data.eval
    })
    .catch(err => console.error("Evaluation error:", err))
}

// white move
function evaluatePosition(sideJustMoved){

    fetch('../api/stockfish_move.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            fen: game.fen(),
            elo: document.getElementById("engineLevel").value
        })
    })
    .then(response => response.json())
    .then(data => {

        if(data.eval === undefined) return

        let quality = classifyMove(lastEval, data.eval, sideJustMoved)
		
		console.log("White quality:", quality, "eval:", data.eval)

        updateEval(data.eval)
        addEval(data.eval)
		setMoveQuality(game.history().length - 1, quality)
		updateMoveHistory()

        lastEval = data.eval
    })
    .catch(err => console.error("Evaluation error:", err))
}