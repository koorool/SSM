<?php
require "dbinfo.php";

// Opens a connection to a MySQL server

$code = $_POST['code'];
//$name = $_POST['name']; // не потрібно сьогодні

//get filetypes to delete
//$filetype;
$connection = mysql_connect(/*"simscene.mysql.ukraine.com.ua"*/"localhost", $username, $password) or die("Не могу соединиться с MySQLI.");

$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");

$query = "DELETE FROM marker WHERE code='" . $code . "'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
mysql_close($connection);

/*$query = "SELECT images FROM marker WHERE code='$code'";
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
while ($row = @mysql_fetch_assoc($result)) {
$filetype = explode(',', $row['images']);
}*/

foreach (glob("../img/" . $code . "*") as $filename) {
	unlink($filename);
	//$files[$i] = $filename;
}

/*$query = "DELETE FROM marker_window WHERE code='" . $code . "'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

$query = "DELETE FROM markerinfo WHERE code='" . $code . "'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());*/

//header("Content-type: text/html");
//if ($filetype[0] != null) {
/*for ($i = 0; $i < count($filetype) - 1; $i++) {
if (file_exists("../img/" . $code . $i . "." . $filetype[$i + 1])) {
unlink("../img/" . $code . $i . "." . $filetype[$i + 1]);
}
}*/
//}

?>