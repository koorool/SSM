<?php

require "dbinfo.php";

//СКРИПТ ПРОВЕРКИ АВТОРИЗАЦИИ
/*if (isset($_GET['logSESS'])) {$logSESS = $_GET['logSESS'];unset($logSESS);}
if (isset($_POST['logSESS'])) {$logSESS = $_POST['logSESS'];unset($logSESS);}

session_start();
$logSESS = $_SESSION['$logSESS'];
if (!isset($logSESS)) {
header("location: login.php");
exit;
}*/
//СКРИПТ ПРОВЕРКИ АВТОРИЗАЦИИ
$user = $_POST['user'];
$pass = $_POST['pass'];
//$hash = password_hash($pass, PASSWORD_DEFAULT);

$connection = mysql_connect($host, $username, $password) or die("Не могу соединиться с MySQLI.");
$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");

$query = "SELECT pass,user FROM Admin";
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

while ($row = @mysql_fetch_assoc($result)) {
	$hash = $row['pass'];
	$user1 = $row['user'];
}
mysql_close($connection);

if (password_verify($pass, $hash) && $user == $user1) {
	echo 'true';
} else {
	echo 'false';
}

?>