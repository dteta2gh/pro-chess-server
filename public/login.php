<?php
session_start();
require "../config/db.php";

if($_POST){
 $u=$_POST['username'];
 $p=$_POST['password'];

 $stmt=$pdo->prepare("SELECT * FROM users WHERE username=?");
 $stmt->execute([$u]);
 $user=$stmt->fetch();

 if($user && password_verify($p,$user['password'])){
  $_SESSION['user_id']=$user['id'];
  header("Location: play.php");
 }
}
?>

<form method="post">
<input name="username" placeholder="username">
<input name="password" type="password">
<button>Login</button>
</form>