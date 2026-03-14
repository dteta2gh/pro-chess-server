<?php

require "../config/db.php";

header('Content-Type: application/json');

$white = $_POST['white_player'] ?? 1;
$black = $_POST['black_player'] ?? 0;
$fen   = $_POST['fen'] ?? '';
$pgn   = $_POST['pgn'] ?? '';
$status = $_POST['status'] ?? 'active';

$stmt = $pdo->prepare("
    INSERT INTO games (white_player, black_player, fen, pgn, status)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->execute([$white, $black, $fen, $pgn, $status]);

echo json_encode([
    "game_id" => $pdo->lastInsertId()
]);