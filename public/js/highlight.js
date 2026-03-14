function removeHighlights(){

$('#board .square-55d63').css('background','')

}

function highlightLastMove(move){

removeHighlights()

if(!move) return

$('#board .square-'+move.from)
.css('background','#f6f669')

$('#board .square-'+move.to)
.css('background','#f6f669')

}

function clearCheckHighlight(){
    $('#board .square-55d63').removeClass('in-check')
}

function highlightCheckKing(){

    clearCheckHighlight()

    if(!game.in_check()) return

    let boardState = game.board()
    let kingSquare = null
    let sideToMove = game.turn()

    for(let rank = 0; rank < 8; rank++){
        for(let file = 0; file < 8; file++){

            let piece = boardState[rank][file]

            if(piece && piece.type === 'k' && piece.color === sideToMove){
                let fileChar = "abcdefgh"[file]
                let rankChar = 8 - rank
                kingSquare = fileChar + rankChar
                break
            }
        }
        if(kingSquare) break
    }

    if(kingSquare){
        $('#board .square-' + kingSquare).addClass('in-check')
    }
}