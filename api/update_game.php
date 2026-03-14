<?php

require "../config/db.php";

header('Content-Type: application/json');

$game_id = $_POST['game_id'] ?? null;
$fen     = $_POST['fen'] ?? '';
$pgn     = $_POST['pgn'] ?? '';
$status  = $_POST['status'] ?? 'active';

if(!$game_id){
    echo json_encode(["error" => "Missing game_id"]);
    exit;
}

$stmt = $pdo->prepare("
    UPDATE games
    SET fen = ?, pgn = ?, status = ?
    WHERE id = ?
");

$stmt->execute([$fen, $pgn, $status, $game_id]);

echo json_encode(["status" => "ok"]);