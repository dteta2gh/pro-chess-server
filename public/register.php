<?php
require "../config/db.php";

if($_POST){
 $u=$_POST['username'];
 $p=password_hash($_POST['password'],PASSWORD_DEFAULT);

 $stmt=$pdo->prepare("INSERT INTO users(username,password) VALUES(?,?)");
 $stmt->execute([$u,$p]);

 echo "Registered";
}
?>

<form method="post">
<input name="username">
<input name="password" type="password">
<button>Register</button>
</form>