var whiteTime=600
var blackTime=600

function initClock(){

updateClocks()

setInterval(clockTick,1000)

}

function clockTick(){

if(game.game_over()) return

if(game.turn()=="w")
whiteTime--
else
blackTime--

if(whiteTime<=0){
alert("Black wins on time")
newGame()
}

if(blackTime<=0){
alert("White wins on time")
newGame()
}

updateClocks()

}

function updateClocks(){

document.getElementById("white-clock").innerHTML=formatTime(whiteTime)

document.getElementById("black-clock").innerHTML=formatTime(blackTime)

}

function formatTime(t){

let m=Math.floor(t/60)
let s=t%60

if(s<10) s="0"+s

return m+":"+s

}