<?php
require "../config/db.php";

$game=$_POST['game_id'];
$move=$_POST['move'];
$fen=$_POST['fen'];

$stmt=$pdo->prepare("INSERT INTO moves(game_id,move,fen) VALUES(?,?,?)");
$stmt->execute([$game,$move,$fen]);

echo json_encode(["status"=>"ok"]);