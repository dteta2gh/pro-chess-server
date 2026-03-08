<?php

namespace ChessServer;

class Stockfish
{

 public function bestMove($fen)
 {

  $engine = "C:/xampp/htdocs/pro-chess-server/stockfish/stockfish.exe";

  $descriptorspec = [
   0 => ["pipe","r"],
   1 => ["pipe","w"],
   2 => ["pipe","w"]
  ];

  $process = proc_open($engine, $descriptorspec, $pipes);

  if (!is_resource($process)) {
   return null;
  }

  fwrite($pipes[0], "uci\n");
  fwrite($pipes[0], "position fen $fen\n");
  fwrite($pipes[0], "go depth 12\n");

  $bestmove = null;

  while ($line = fgets($pipes[1])) {

   if (strpos($line, "bestmove") !== false) {

    $parts = explode(" ", trim($line));
    $bestmove = $parts[1];
    break;

   }

  }

  fclose($pipes[0]);
  fclose($pipes[1]);

  proc_close($process);

  return $bestmove;

 }

}