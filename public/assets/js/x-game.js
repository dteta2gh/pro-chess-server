document.addEventListener("DOMContentLoaded", function() {

var board = null
var game = new Chess()

var socket = new WebSocket("ws://localhost:8080/chess")

socket.onmessage = function(e)
{
 let data = JSON.parse(e.data)

 if(data.type === "move")
 {
   game.move(data.move)
   board.position(game.fen())
 }
}

function onDragStart (source, piece)
{
 if (game.game_over()) return false
}

function onDrop (source, target)
{
 var move = game.move({
  from: source,
  to: target,
  promotion: 'q'
 })

 if (move === null) return 'snapback'

 board.position(game.fen())

 socket.send(JSON.stringify({
  type:"move",
  move:move.san,
  fen:game.fen()
 }))

 saveMove(move.san)

 return true
}

function onSnapEnd ()
{
 board.position(game.fen())
}

board = Chessboard('board', {

 pieceTheme:
 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',

 draggable: true,
 position: 'start',
 onDragStart: onDragStart,
 onDrop: onDrop,
 onSnapEnd: onSnapEnd

})

function saveMove(move)
{
 fetch("../api/move.php",{
  method:"POST",
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:"game_id=1&move="+move+"&fen="+game.fen()
 })
}

window.playStockfish = function()
{
 fetch("../api/stockfish_move.php",{
  method:"POST",
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:"fen="+game.fen()
 })
 .then(r=>r.json())
 .then(data=>{

 if(!data.move){
   console.log("Stockfish returned no move", data)
   return
 }

   var move = data.move

   var from = move.substring(0,2)
   var to   = move.substring(2,4)

   game.move({
     from: from,
     to: to,
     promotion: 'q'
   })

   board.position(game.fen())

   })
}

});