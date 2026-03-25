<?php

require "../config/db.php";

header('Content-Type: application/json');

$game_id = $_POST['game_id'] ?? null;
$eval = $_POST['eval'] ?? null;
$quality = $_POST['quality'] ?? null;

if (!$game_id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing game_id']);
    exit;
}

$stmt = $pdo->prepare("
    UPDATE moves
    SET eval = ?, quality = ?
    WHERE id = (
        SELECT id FROM (
            SELECT id
            FROM moves
            WHERE game_id = ?
            ORDER BY id DESC
            LIMIT 1
        ) AS last_move
    )
");

$stmt->execute([$eval, $quality, $game_id]);

echo json_encode(['status' => 'ok']);