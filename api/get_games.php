<?php

require "../config/db.php";

header('Content-Type: application/json');

$stmt = $pdo->query("
    SELECT id, created_at, pgn
    FROM games
    ORDER BY id DESC
    LIMIT 20
");

$games = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($games);