<?php

require "../config/db.php";

header('Content-Type: application/json');

$game_id = $_GET['game_id'] ?? null;

$stmt = $pdo->prepare("
    SELECT move
    FROM moves
    WHERE game_id = ?
    ORDER BY id ASC
");

$stmt->execute([$game_id]);

$moves = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($moves);