<?php

require "../config/db.php";

header('Content-Type: application/json');

$game_id = $_POST['game_id'] ?? null;
$move = $_POST['move'] ?? null;
$fen = $_POST['fen'] ?? null;
$eval = $_POST['eval'] ?? null;
$quality = $_POST['quality'] ?? null;
$white_time = $_POST['white_time'] ?? null;
$black_time = $_POST['black_time'] ?? null;

$stmt = $pdo->prepare("
    INSERT INTO moves (game_id, move, fen, eval, quality, white_time, black_time)
    VALUES (?, ?, ?, ?, ?, ?, ?)
");

$stmt->execute([
    $game_id,
    $move,
    $fen,
    $eval,
    $quality,
    $white_time,
    $black_time
]);

echo json_encode(['status' => 'ok']);