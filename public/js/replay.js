var replayBoard = null;
var replayGame = new Chess();
var replayMoves = [];
var replayIndex = 0;
var replayGameId = typeof replayGameId !== "undefined" ? replayGameId : 0;

function getReplayMoveText(moveItem) {
    if (typeof moveItem === "string") {
        return moveItem;
    }

    if (moveItem && typeof moveItem === "object") {
        if (moveItem.move) return moveItem.move;
        if (moveItem.san) return moveItem.san;
        if (moveItem.uci) return moveItem.uci;
    }

    return "";
}

async function loadReplayGameById(id) {
    try {
        const response = await fetch('../api/get_moves.php?game_id=' + encodeURIComponent(id));

        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }

        const data = await response.json();

        console.log("Replay API response:", JSON.stringify(data, null, 2));

        if (!Array.isArray(data)) {
            throw new Error("Replay data is not an array");
        }

        replayMoves = data;
        replayIndex = 0;

        stopReplayAutoPlay();
        updateReplayAutoPlayButton();

        replayGame.reset();
        replayBoard.position(replayGame.fen());

        updateReplayHistory();
        updateReplayStatus();
        drawReplayEvalGraph();
        updateReplayEval();
        updateReplayClocks();
		
		loadReplayMeta(id);

    } catch (error) {
        console.error("Replay load error:", error);

        replayMoves = [];
        replayIndex = 0;

        stopReplayAutoPlay();
        updateReplayAutoPlayButton();

        replayGame.reset();

        if (replayBoard) {
            replayBoard.position(replayGame.fen());
        }

        updateReplayHistory();
        updateReplayStatus();
        drawReplayEvalGraph();
        updateReplayEval();
        updateReplayClocks();

        var status = document.getElementById("status");
        if (status) {
            status.innerText = "Failed to load replay data";
        }
    }
}

function updateReplayStatus() {
    var status = document.getElementById("status");
    if (!status) return;

    status.innerText =
        "Replay Game " + replayGameId +
        " — Move " + replayIndex +
        " / " + replayMoves.length;
}

function updateReplayHistory() {
    var container = document.getElementById("move-history");
    if (!container) return;

    var html = "";

    for (var i = 0; i < replayMoves.length; i += 2) {
        var moveNumber = (i / 2) + 1;

        var whiteMove = replayMoves[i];
        var blackMove = replayMoves[i + 1];

        var whiteMoveText = getReplayMoveText(whiteMove);
        var blackMoveText = (i + 1 < replayMoves.length) ? getReplayMoveText(blackMove) : "";

        var whiteQuality = getMoveQuality(whiteMove);
        var blackQuality = getMoveQuality(blackMove);

        var whiteQualitySymbol = getMoveQualitySymbol(whiteMove);
        var blackQualitySymbol = getMoveQualitySymbol(blackMove);

        var whiteActive = (replayIndex === i + 1) ? " active-move" : "";
        var blackActive = (replayIndex === i + 2) ? " active-move" : "";

        html += `
            <div class="move-row">
                <div class="move-num">${moveNumber}.</div>
                <div class="move-cell white-cell${whiteActive}${whiteQuality ? ' q-' + whiteQuality : ''}" data-index="${i + 1}" onclick="jumpToReplayMove(${i + 1})">
                    <span class="move-text">${whiteMoveText}${whiteQualitySymbol ? ' ' + whiteQualitySymbol : ''}</span>
                </div>
                <div class="move-cell black-cell${blackActive}${blackQuality ? ' q-' + blackQuality : ''}" ${blackMoveText ? `data-index="${i + 2}" onclick="jumpToReplayMove(${i + 2})"` : ""}>
                    <span class="move-text">${blackMoveText}${blackQualitySymbol ? ' ' + blackQualitySymbol : ''}</span>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    scrollToActiveMove();
}

function getMoveQuality(moveItem) {
    if (!(moveItem && typeof moveItem === "object" && moveItem.quality)) {
        return null;
    }

    const q = String(moveItem.quality).trim();

    if (q === "!!") return "best";
    if (q === "!") return "excellent";
    if (q === "✓") return "good";
    if (q === "?!") return "inaccuracy";
    if (q === "?") return "mistake";
    if (q === "??") return "blunder";

    return q.toLowerCase();
}

function getMoveQualitySymbol(moveItem) {
    if (moveItem && typeof moveItem === "object" && moveItem.quality) {
        return String(moveItem.quality).trim();
    }
    return "";
}

function rebuildReplayPosition() {
    replayGame.reset();

    for (var i = 0; i < replayIndex; i++) {
        var moveText = getReplayMoveText(replayMoves[i]);
        if (!moveText) continue;

        var result = replayGame.move(moveText);

        if (!result) {
            console.warn("Invalid replay move at index", i, replayMoves[i]);
            break;
        }
    }

    replayBoard.position(replayGame.fen());
	updateReplayStatus();
	updateReplayHistory();
	updateReplayEval();
	drawReplayEvalGraph();
	updateReplayClocks();
}

function nextReplayMove(fromAutoPlay) {
    if (!fromAutoPlay) {
        stopReplayAutoPlay();
        updateReplayAutoPlayButton();
    }

    if (replayIndex >= replayMoves.length) return;
    replayIndex++;
    rebuildReplayPosition();
}

function prevReplayMove() {
    stopReplayAutoPlay();
    updateReplayAutoPlayButton();

    if (replayIndex <= 0) return;
    replayIndex--;
    rebuildReplayPosition();
}

function replayStart() {
    stopReplayAutoPlay();
    updateReplayAutoPlayButton();

    replayIndex = 0;
    rebuildReplayPosition();
}

function replayEnd() {
    stopReplayAutoPlay();
    updateReplayAutoPlayButton();

    replayIndex = replayMoves.length;
    rebuildReplayPosition();
}

function jumpToReplayMove(index) {
    stopReplayAutoPlay();
    updateReplayAutoPlayButton();

    if (index < 0) index = 0;
    if (index > replayMoves.length) index = replayMoves.length;

    replayIndex = index;
    rebuildReplayPosition();
}

function initReplayPage() {
    replayBoard = Chessboard('board', {
        draggable: false,
        position: 'start'
    });

    updateReplayAutoPlayButton();
    document.addEventListener("keydown", handleReplayKeydown);

    if (replayGameId > 0) {
        loadReplayGameById(replayGameId);
    } else {
        updateReplayStatus();
    }
}

function scrollToActiveMove() {
    const active = document.querySelector(".active-move");
    const container = document.getElementById("move-history");

    if (!active || !container) return;

    const offsetTop = active.offsetTop;
    const containerHeight = container.clientHeight;

    container.scrollTop = offsetTop - containerHeight / 2;
}

function updateReplayClocks() {

    let whiteClock = document.getElementById("white-clock");
    let blackClock = document.getElementById("black-clock");

    if (!whiteClock || !blackClock) return;

    // move 0 → starting position
    if (replayIndex <= 0) {
        whiteClock.innerText = formatTime(initialWhiteTime);
        blackClock.innerText = formatTime(initialBlackTime);
        return;
    }

    const move = replayMoves[replayIndex - 1];

    if (!move) return;

    let wt = Number(move.white_time ?? 0);
    let bt = Number(move.black_time ?? 0);

    whiteClock.innerText = formatTime(wt);
    blackClock.innerText = formatTime(bt);
}

function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return m + ":" + String(s).padStart(2, "0");
}

var replayAutoPlayTimer = null;
var replayAutoPlayDelay = 1000;

function startReplayAutoPlay() {
    stopReplayAutoPlay();

    if (replayIndex >= replayMoves.length) {
        replayStart();
    }

    replayAutoPlayTimer = setInterval(function () {
        if (replayIndex >= replayMoves.length) {
            stopReplayAutoPlay();
            updateReplayAutoPlayButton();
            return;
        }

        nextReplayMove(true);
    }, replayAutoPlayDelay);
}

function stopReplayAutoPlay() {
    if (replayAutoPlayTimer) {
        clearInterval(replayAutoPlayTimer);
        replayAutoPlayTimer = null;
    }
}

function toggleReplayAutoPlay() {
    if (replayAutoPlayTimer) {
        stopReplayAutoPlay();
    } else {
        startReplayAutoPlay();
    }

    updateReplayAutoPlayButton();
}

function updateReplayAutoPlayButton() {
    var btn = document.getElementById("replay-autoplay-btn");
    if (!btn) return;

    btn.innerText = replayAutoPlayTimer ? "Pause" : "Autoplay";
}

function handleReplayKeydown(event) {
    if (!document.body.classList.contains("replay-page")) return;

    if (
        event.target &&
        (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA" ||
            event.target.tagName === "SELECT"
        )
    ) {
        return;
    }

    switch (event.key) {
        case "ArrowLeft":
            event.preventDefault();
            prevReplayMove();
            break;

        case "ArrowRight":
            event.preventDefault();
            nextReplayMove();
            break;

        case "Home":
            event.preventDefault();
            replayStart();
            break;

        case "End":
            event.preventDefault();
            replayEnd();
            break;

        case " ":
        case "Spacebar":
            event.preventDefault();
            toggleReplayAutoPlay();
            break;
    }
}

async function loadReplayMeta(gameId) {
	console.log("loadReplayMeta called with gameId:", gameId);
    try {
        const response = await fetch('../api/get_game.php?game_id=' + encodeURIComponent(gameId));
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }

        const data = await response.json();
        if (!data || data.status !== 'ok' || !data.game) {
            throw new Error('Invalid metadata response');
        }

        const game = data.game;

        document.getElementById("meta-game-id").innerText = game.id ?? "-";
        document.getElementById("meta-date").innerText = game.created_at ?? "-";
        document.getElementById("meta-status").innerText = game.status ?? "-";

        const initialTime = Number(game.initial_time ?? 600);
        const increment = Number(game.increment_seconds ?? 0);
        document.getElementById("meta-time-control").innerText =
            formatTimeControl(initialTime, increment);

        document.getElementById("meta-side").innerText =
            getSideLabel(game.white_player, game.black_player);

        document.getElementById("meta-result").innerText =
            getReplayResultLabel(game.status);

        document.getElementById("meta-move-count").innerText = replayMoves.length;
    } catch (error) {
        console.error("Replay meta load error:", error);
    }
}

function formatTimeControl(initialTime, increment) {
    let minutes = Math.floor(initialTime / 60);
    let seconds = initialTime % 60;

    let base = minutes + ":" + String(seconds).padStart(2, "0");
    return base + (increment > 0 ? " +" + increment : "");
}

function getSideLabel(whitePlayer, blackPlayer) {
    if (Number(whitePlayer) === 1 && Number(blackPlayer) === 0) {
        return "White";
    }
    if (Number(whitePlayer) === 0 && Number(blackPlayer) === 1) {
        return "Black";
    }
    return "Unknown";
}

function getReplayResultLabel(status) {
    if (status === "finished") return "Finished";
    if (status === "active") return "In Progress";
    return status || "-";
}

window.onload = initReplayPage;