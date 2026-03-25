function updateMoveHistory(){

    var history = []

    if(typeof replayMode !== "undefined" && replayMode && replayMoves.length){
        history = replayMoves.map(m => m.move ? m.move : m)
    }else{
        history = game.history()
    }

    var html = ""

    for(var i = 0; i < history.length; i += 2){

        let moveNumber = (i / 2) + 1
        let whiteMove = history[i] || ""
        let blackMove = history[i + 1] || ""

        let whiteQuality = (typeof moveQualities !== "undefined" && moveQualities[i]) ? moveQualities[i] : ""
        let blackQuality = (typeof moveQualities !== "undefined" && moveQualities[i + 1]) ? moveQualities[i + 1] : ""

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

async function loadGameList(selectedGameId = null) {
    try {
        const response = await fetch('../api/get_games.php');
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }

        const games = await response.json();
        const select = document.getElementById("game-list");

        if (!select) return;

        select.innerHTML = "";

        if (!games.length) {
            const option = document.createElement("option");
            option.value = "";
            option.text = "No saved games";
            option.disabled = true;
            option.selected = true;
            select.appendChild(option);
            return;
        }

        games.forEach(g => {
            const option = document.createElement("option");
            option.value = g.id;
            option.text = "Game " + g.id;

            if (selectedGameId && String(g.id) === String(selectedGameId)) {
                option.selected = true;
            }

            select.appendChild(option);
        });
    } catch (error) {
        console.error("Failed to load game list:", error);

        const select = document.getElementById("game-list");
        if (!select) return;

        select.innerHTML = "";
        const option = document.createElement("option");
        option.value = "";
        option.text = "Failed to load games";
        option.disabled = true;
        option.selected = true;
        select.appendChild(option);
    }
}

function loadSelectedGame() {
    const select = document.getElementById("game-list");

    if (!select || !select.value) {
        return;
    }

    const gameId = select.value;
    window.location.href = 'replay.php?game_id=' + encodeURIComponent(gameId);
}