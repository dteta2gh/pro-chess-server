function buildReplayEvalHistory() {

    let history = [];

    for (let i = 0; i < replayMoves.length; i++) {
        let move = replayMoves[i];

        if (move && typeof move === "object" && move.eval !== null && move.eval !== undefined) {
            history.push(Number(move.eval));
        } else {
            history.push(0);
        }
    }

    return history;
}

function drawReplayEvalGraph() {

    let graph = document.getElementById("eval-graph");
    if (!graph) return;

    graph.innerHTML = "";

    let history = buildReplayEvalHistory();

    let w = graph.clientWidth;
    let h = graph.clientHeight;

    let step = w / Math.max(history.length - 1, 1);

    let path = "";

    for (let i = 0; i < history.length; i++) {

        let x = i * step;
        let y = h / 2 - (history[i] / 1000) * (h / 2);

        path += x + "," + y + " ";
    }

    // --- CURRENT MOVE MARKER ---
    let marker = "";
    let guide = "";

    if (replayIndex >= 0 && history.length > 0) {

        let i = Math.max(0, replayIndex - 1);

        let x = i * step;
        let y = h / 2 - (history[i] / 1000) * (h / 2);

        // vertical guide line
        guide = `
            <line
                x1="${x}" y1="0"
                x2="${x}" y2="${h}"
                stroke="#888"
                stroke-width="1"
                stroke-dasharray="3,3"
            />
        `;

        // marker circle
        marker = `
            <circle
                cx="${x}" cy="${y}"
                r="4"
                fill="#ffcc00"   // marker color
				stroke="#00ff88" // line color
                stroke-width="1"
            />
        `;
    }

    let svg = `
    <svg width="${w}" height="${h}">
        <polyline
            fill="none"
            stroke="#00ff88"
            stroke-width="2"
            points="${path}"
        />
        ${guide}
        ${marker}
    </svg>
    `;

    graph.innerHTML = svg;
}