function updateMoveHistory(){

    var history = game.history()
    var html = ""

    for(var i = 0; i < history.length; i += 2){

        let moveNumber = (i / 2) + 1
        let whiteMove = history[i] || ""
        let blackMove = history[i + 1] || ""

        let whiteQuality = moveQualities[i] || ""
        let blackQuality = moveQualities[i + 1] || ""

        html += `
            <div class="move-row">
                <div class="move-num">${moveNumber}.</div>

                <div class="move-cell white-cell">
                    <span class="move-text">${whiteMove}</span>
                    ${whiteQuality ? `<span class="move-quality ${qualityClass(whiteQuality)}">${whiteQuality}</span>` : ""}
                </div>

                <div class="move-cell black-cell">
                    <span class="move-text">${blackMove}</span>
                    ${blackQuality ? `<span class="move-quality ${qualityClass(blackQuality)}">${blackQuality}</span>` : ""}
                </div>
            </div>
        `
    }

    document.getElementById("move-history").innerHTML = html
}

function qualityClass(label){
    if(label.includes("Blunder")) return "quality-blunder"
    if(label.includes("Mistake")) return "quality-mistake"
    if(label.includes("Inaccuracy")) return "quality-inaccuracy"
    return "quality-best"
}

function updateMoveQuality(label){

let moves = document.querySelectorAll("#move-history div")

if(moves.length === 0) return

let last = moves[moves.length-1]

last.innerHTML += " <span class='move-quality'>"+label+"</span>"

}