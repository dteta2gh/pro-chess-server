<?php

require "../config/db.php";

header('Content-Type: application/json');

$white_player = $_POST['white_player'] ?? 0;
$black_player = $_POST['black_player'] ?? 0;
$fen = $_POST['fen'] ?? '';
$pgn = $_POST['pgn'] ?? '';
$status = $_POST['status'] ?? 'active';
$initial_time = $_POST['initial_time'] ?? 600;
$increment_seconds = $_POST['increment_seconds'] ?? 0;

$stmt = $pdo->prepare("
    INSERT INTO games (white_player, black_player, fen, pgn, status, initial_time, increment_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?)
");

$stmt->execute([
    $white_player,
    $black_player,
    $fen,
    $pgn,
    $status,
    $initial_time,
    $increment_seconds
]);

echo json_encode([
    'status' => 'ok',
    'game_id' => $pdo->lastInsertId()
]);