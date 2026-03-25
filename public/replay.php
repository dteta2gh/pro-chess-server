<?php
$gameId = isset($_GET['game_id']) ? (int)$_GET['game_id'] : 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Replay Game</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css">
    <link rel="stylesheet" href="css/play.css">
	<link rel="stylesheet" href="css/replay.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.12.0/chess.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"></script>
</head>
<body class="replay-page">

<h1>Replay Game</h1>

<div id="controls" class="replay-top-controls">
    <button type="button" onclick="window.location.href='play.php'">Exit Replay</button>
    <button type="button" onclick="replayStart()">|&lt;</button>
    <button type="button" onclick="prevReplayMove()">&lt;</button>
    <button type="button" onclick="nextReplayMove()">&gt;</button>
    <button type="button" onclick="replayEnd()">&gt;|</button>
    <button type="button" id="replay-autoplay-btn" onclick="toggleReplayAutoPlay()">Autoplay</button>
</div>

<div id="game-meta">
    <div><strong>Game:</strong> <span id="meta-game-id">-</span></div>
    <div><strong>Date:</strong> <span id="meta-date">-</span></div>
    <div><strong>Status:</strong> <span id="meta-status">-</span></div>
    <div><strong>Result:</strong> <span id="meta-result">-</span></div>
    <div><strong>Time:</strong> <span id="meta-time-control">-</span></div>
    <div><strong>Side:</strong> <span id="meta-side">-</span></div>
    <div><strong>Moves:</strong> <span id="meta-move-count">-</span></div>
</div>

<div id="game-layout">
    <div id="eval-container">
        <div id="eval-bar">
            <div id="eval-fill"></div>
        </div>
        <div id="eval-score">0.00</div>
        <div id="eval-graph"></div>
    </div>

    <div id="board-area">
		<div id="black-clock">10:00</div>
		
        <div id="board" style="width:480px"></div>
		
		<div id="white-clock">10:00</div>
		
        <div id="status">Replay Game <?php echo $gameId; ?> — Move 0 / 0</div>
    </div>

	<div id="moves">
		<h3>Move History</h3>
		<div id="move-history"></div>
	</div>
</div>


<?php
require "../config/db.php";

$stmt = $pdo->prepare("SELECT initial_time FROM games WHERE id = ?");
$stmt->execute([$gameId]);
$game = $stmt->fetch(PDO::FETCH_ASSOC);

$initialTime = $game['initial_time'] ?? 600;
?>

<script>
var replayGameId = <?php echo $gameId; ?>;
var initialWhiteTime = <?php echo (int)$initialTime; ?>;
var initialBlackTime = <?php echo (int)$initialTime; ?>;
</script>

<script src="js/replay_evalgraph.js"></script>
<script src="js/replay_eval.js"></script>
<script src="js/replay.js"></script>

</body>
</html>