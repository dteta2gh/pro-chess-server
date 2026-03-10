function updateEval(score){

const MAX = 1000

if(score > MAX) score = MAX
if(score < -MAX) score = -MAX

let percent = 50 + (score / MAX) * 50

if(board && board.orientation && board.orientation() === "black"){
percent = 100 - percent
}

// get elements safely
let bar = document.getElementById("eval-bar")
let scoreText = document.getElementById("eval-score")

// update bar if it exists
if(bar){
bar.style.height = percent + "%"
}

// update numeric score if it exists
if(scoreText){
scoreText.innerText = (score/100).toFixed(2)
}

}