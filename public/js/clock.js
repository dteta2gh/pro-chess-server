var whiteTime = 600
var blackTime = 600
var clockInterval = null

function initClock(){

    if(clockInterval) return

    clockInterval = setInterval(clockTick, 1000)
}

function startClock(){
    clockRunning = true
}

function stopClock(){
    clockRunning = false
}

function clockTick(){

    if(!clockRunning) return
    if(game.game_over()) return

    if(game.turn() == "w"){
        whiteTime--
    }else{
        blackTime--
    }

    if(whiteTime <= 0){
        stopClock()
        document.getElementById("status").innerText = "Black wins on time"
        document.getElementById("status").className = "status-mate"
        return
    }

    if(blackTime <= 0){
        stopClock()
        document.getElementById("status").innerText = "White wins on time"
        document.getElementById("status").className = "status-mate"
        return
    }

    updateClocks()
}

function updateClocks(){
    document.getElementById("white-clock").innerHTML = formatTime(whiteTime)
    document.getElementById("black-clock").innerHTML = formatTime(blackTime)
}

function formatTime(t){

    var m = Math.floor(t / 60)
    var s = t % 60

    if(s < 10) s = "0" + s

    return m + ":" + s
}