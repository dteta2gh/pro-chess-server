<?php

require "../config/db.php";

header('Content-Type: application/json');

$game_id = $_GET['game_id'] ?? null;

if (!$game_id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing game_id']);
    exit;
}

$stmt = $pdo->prepare("
    SELECT id, white_player, black_player, status, initial_time, increment_seconds, created_at
    FROM games
    WHERE id = ?
    LIMIT 1
");

$stmt->execute([$game_id]);

$game = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$game) {
    echo json_encode(['status' => 'error', 'message' => 'Game not found']);
    exit;
}

echo json_encode([
    'status' => 'ok',
    'game' => $game
]);