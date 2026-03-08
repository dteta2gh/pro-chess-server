<?php
namespace ChessServer;
use PChess\Chess\Chess;

class ChessGame {
    private $chess;
    public function __construct(){
        $this->chess = new Chess();
    }
    public function loadFEN($fen){
        $this->chess->load($fen);
    }
    public function move($move){
        return $this->chess->move($move);
    }
    public function fen(){
        return $this->chess->fen();
    }
    public function pgn(){
        return $this->chess->pgn();
    }
}