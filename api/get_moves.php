<?php

require "../config/db.php";

header('Content-Type: application/json');

$game_id = $_GET['game_id'] ?? null;

if (!$game_id) {
    echo json_encode([]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT move, fen, eval, quality, white_time, black_time
    FROM moves
    WHERE game_id = ?
    ORDER BY id ASC
");

$stmt->execute([$game_id]);

$moves = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($moves);