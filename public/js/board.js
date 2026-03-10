function initBoard(){

board = Chessboard('board', {

draggable: true,
position: 'start',
onDragStart: onDragStart,
onDrop: onDrop,
onSnapEnd: onSnapEnd

})

}

function onDragStart(source,piece){

if(game.game_over()) return false

if(piece.search(/^b/) !== -1) return false

}

function onDrop(source,target){

removeHighlights()

let move = game.move({
from:source,
to:target,
promotion:'q'
})

if(!move) return 'snapback'

highlightLastMove(move)

board.position(game.fen())

updateMoveHistory()

setTimeout(playStockfish,300)

}

function onSnapEnd(){

board.position(game.fen())

}