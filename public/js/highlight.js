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