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

    if(!gameStarted) return false

    if(game.game_over()) return false

    if(playerSide === 'w' && piece.search(/^b/) !== -1) return false
    if(playerSide === 'b' && piece.search(/^w/) !== -1) return false

    if(game.turn() !== playerSide) return false
}

function onDrop(source,target){

    clearArrows()

    let move = game.move({
        from:source,
        to:target,
        promotion:'q'
    })

    if(!move) return 'snapback'

    removeHighlights()
    highlightLastMove(move)

    board.position(game.fen())

    // ✅ APPLY INCREMENT HERE
    let sideJustMoved = (game.turn() === 'w') ? 'b' : 'w';
    applyIncrement(sideJustMoved);

    updateMoveHistory()
    updateTurnStatus()
	
    saveMoveRecord(move.san)
    updateGameRecord()

    if(checkGameEnd()) return

    evaluatePosition(playerSide)

    if(autoStockfish){
        setTimeout(playStockfish,300)
    }
}

function onSnapEnd(){

board.position(game.fen())

}