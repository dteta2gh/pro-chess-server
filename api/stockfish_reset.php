<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../classes/Stockfish.php';

$engine = new Stockfish();

$engine->send("stop");
$engine->send("ucinewgame");

echo json_encode(["status"=>"ok"]);