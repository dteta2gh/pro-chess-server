<?php require "../config/auth.php"; ?>
<!DOCTYPE html>
<html>
<head>

<title>Pro Chess Server</title>

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css"/>

<link rel="stylesheet" href="css/game.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.12.0/chess.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"></script>

<script src="js/highlight.js"></script>
<script src="js/history.js"></script>
<script src="js/eval.js"></script>

<script src="js/gamecontrols.js"></script>

<script src="js/clock.js"></script>
<script src="js/engine.js"></script>
<script src="js/board.js"></script>

<script src="js/evalgraph.js"></script>

<script src="js/game.js"></script>

</head>

<body>

<h2>Pro Chess Server v2</h2>

<div id="controls">

Engine Level:
<select id="engineLevel">

<option value="800">Beginner</option>
<option value="1200" selected>Casual</option>
<option value="1600">Club</option>
<option value="2000">Advanced</option>
<option value="2400">Master</option>

</select>

<button onclick="board.flip()">Flip Board</button>

<button onclick="newGame()">New Game</button>

<button onclick="resign()">Resign</button>

<button onclick="exportPGN()">Export PGN</button>

</div>

<div id="game-layout">

    <div id="eval-container">
		<div id="eval-bar"></div>
		<div id="eval-score">0.00</div>
 		<div id="eval-graph"></div>
    </div>

    <div id="board-area">
        <div id="black-clock">10:00</div>
        <div id="board" style="width:480px"></div>
        <div id="white-clock">10:00</div>
    </div>

    <div id="moves">
        <h3>Move History</h3>
        <div id="move-history"></div>
    </div>

</div>

<script src="js/game.js"></script>

</body>
</html>