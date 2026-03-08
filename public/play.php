<?php require "../config/auth.php"; ?>
<!DOCTYPE html>
<html>
<head>
<title>Play Chess</title>

<link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css" />

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.12.0/chess.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"></script>

<script src="assets/js/game.js"></script>

<style>

#board{
 width:500px;
 margin:30px;
}

</style>

</head>

<body>

<h2>Play Chess</h2>

<div id="board"></div>

<button onclick="playStockfish()">Play vs Stockfish</button>

</body>
</html>