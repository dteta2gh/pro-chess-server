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

function handleEngineResponse(data){

console.log("Stockfish:",data)

if(data.eval!==undefined){

updateEval(data.eval)

addEval(data.eval)

}

if(!data.move || data.move.length!==4)
return

playEngineMove(data.move)

}

function playEngineMove(move){

let m = game.move({
from:move.substring(0,2),
to:move.substring(2,4),
promotion:'q'
})

highlightLastMove(m)

board.position(game.fen())

updateMoveHistory()

}

function resetEngine(){

fetch('../api/stockfish_reset.php', {
method:'POST'
})
.catch(err => console.log("Engine reset failed", err))

}