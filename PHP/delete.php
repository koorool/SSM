<?php
require "dbinfo.php";

// Opens a connection to a MySQL server
$connection = mysql_connect(/*"simscene.mysql.ukraine.com.ua"*/"localhost", $username, $password) or die("Не могу соединиться с MySQLI.");

//if (!$connection) {  die('Not connected : ' . mysql_error());}

// Set the active MySQL database
$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");

mysql_query('SET NAMES utf8');

$code = $_POST['code'];
//$name = $_POST['name']; // не потрібно сьогодні

//get filetypes to delete
$filetype;
$query = "SELECT images FROM marker WHERE code='$code'";
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
while ($row = @mysql_fetch_assoc($result)) {
	$filetype = explode(',', $row['images']);
}
//echo $filetype[count($filetype) - 1];

$query = "DELETE FROM marker WHERE code='" . $code . "'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

/*$query = "DELETE FROM marker_window WHERE code='" . $code . "'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

$query = "DELETE FROM markerinfo WHERE code='" . $code . "'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());*/

header("Content-type: text/html");
//if ($filetype[0] != null) {
for ($i = 0; $i < count($filetype) - 1; $i++) {
	if (file_exists("../img/" . $code . $i . "." . $filetype[$i + 1])) {
		unlink("../img/" . $code . $i . "." . $filetype[$i + 1]);
	}
}
//}

mysql_close($connection);

?>