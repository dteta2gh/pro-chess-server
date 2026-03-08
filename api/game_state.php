<?php
require "../config/db.php";

$game=$_GET['game'];

$stmt=$pdo->prepare("SELECT * FROM moves WHERE game_id=? ORDER BY id");
$stmt->execute([$game]);

echo json_encode($stmt->fetchAll());