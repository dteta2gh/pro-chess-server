function getReplayEvalAtIndex(index) {
    if (index <= 0) return 0;

    const move = replayMoves[index - 1];

    if (!move || typeof move !== "object") return 0;
    if (!Object.prototype.hasOwnProperty.call(move, "eval")) return 0;
    if (move.eval === null || move.eval === undefined || move.eval === "") return 0;

    const score = Number(move.eval);

    if (Number.isNaN(score)) return 0;

    return score;
}

function updateReplayEval() {

	console.log("Replay index:", replayIndex, "Move eval:", getReplayEvalAtIndex(replayIndex));
	
    const score = getReplayEvalAtIndex(replayIndex);

    const MAX = 1000;

    let displayScore = score;

    if (displayScore > MAX) displayScore = MAX;
    if (displayScore < -MAX) displayScore = -MAX;

    let percent = 50 + (displayScore / MAX) * 50;

    let fill = document.getElementById("eval-fill");
    let scoreText = document.getElementById("eval-score");

    if (fill) {
        fill.style.height = percent + "%";
    }

    if (scoreText) {
        let text = (displayScore / 100).toFixed(2);
        if (displayScore > 0) text = "+" + text;
        scoreText.innerText = text;
    }
}