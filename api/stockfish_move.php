<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require "../vendor/autoload.php";

use ChessServer\Stockfish;

header('Content-Type: application/json');

$fen = $_POST['fen'] ?? null;

if(!$fen){
    echo json_encode([
        "error" => "No FEN provided"
    ]);
    exit;
}

$engine = new Stockfish();

$move = $engine->bestMove($fen);

echo json_encode([
    "move" => $move
]);