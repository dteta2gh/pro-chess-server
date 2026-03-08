<?php
$pdo = new PDO("mysql:host=localhost;dbname=chess","root","");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>