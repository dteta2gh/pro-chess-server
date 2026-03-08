<?php
require "../config/db.php";

$white=$_POST['white'];
$black=$_POST['black'];

$stmt=$pdo->prepare("INSERT INTO games(white_player,black_player,status) VALUES(?,?,?)");
$stmt->execute([$white,$black,'active']);

echo json_encode(["game_id"=>$pdo->lastInsertId()]);