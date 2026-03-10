<?php

$data = json_decode(file_get_contents("php://input"), true);

$fen = $data['fen'] ?? null;
$elo = $data['elo'] ?? 1200;

if(!$fen){

echo json_encode(["move"=>null]);
exit;

}

$engine="C:/xampp/htdocs/pro-chess-server/stockfish/stockfish.exe";

$descriptorspec = [

0 => ["pipe","r"],
1 => ["pipe","w"]

];

$process = proc_open($engine,$descriptorspec,$pipes);

fwrite($pipes[0],"uci\n");

fwrite($pipes[0],"setoption name UCI_LimitStrength value true\n");
fwrite($pipes[0],"setoption name UCI_Elo value $elo\n");

fwrite($pipes[0],"position fen $fen\n");

fwrite($pipes[0],"go movetime 1000\n");

$eval = 0;
$move = null;

while ($line = fgets($pipes[1])) {

    // capture evaluation
    if (strpos($line, "score cp") !== false) {

        preg_match('/score cp (-?\d+)/', $line, $m);

        if(isset($m[1])){
            $eval = intval($m[1]);
        }

    }

    // capture mate scores
    if (strpos($line, "score mate") !== false) {

        preg_match('/score mate (-?\d+)/', $line, $m);

        if(isset($m[1])){
            $eval = $m[1] * 1000;
        }

    }

    // capture best move
    if (strpos($line, "bestmove") !== false) {

        $parts = explode(" ", $line);

        $move = trim($parts[1]);

        break;
    }
}


proc_close($process);

echo json_encode([
"move"=>$move,
"eval" => $eval
]);