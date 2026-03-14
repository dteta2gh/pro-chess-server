function updateEval(score){

    const MAX = 1000

    // convert to White's perspective for display
    let displayScore = score
    if(game && game.turn && game.turn() === 'b'){
        displayScore = -displayScore
    }

    if(displayScore > MAX) displayScore = MAX
    if(displayScore < -MAX) displayScore = -MAX

    let percent = 50 + (displayScore / MAX) * 50

    let fill = document.getElementById("eval-fill")
    let scoreText = document.getElementById("eval-score")

    if(fill){
        fill.style.height = percent + "%"
    }

    if(scoreText){
        let text = (displayScore / 100).toFixed(2)
        if(displayScore > 0) text = "+" + text
        scoreText.innerText = text
    }
}