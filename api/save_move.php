<?php

require "../config/db.php";

header('Content-Type: application/json');

$game_id = $_POST['game_id'] ?? null;
$move    = $_POST['move'] ?? '';
$fen     = $_POST['fen'] ?? '';

if(!$game_id){
    echo json_encode(["error" => "Missing game_id"]);
    exit;
}

$stmt = $pdo->prepare("
    INSERT INTO moves (game_id, move, fen)
    VALUES (?, ?, ?)
");

$stmt->execute([$game_id, $move, $fen]);

echo json_encode(["status" => "ok"]);