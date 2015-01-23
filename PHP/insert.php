<?php
require "dbinfo.php";

// Opens a connection to a MySQL server
$connection = mysql_connect(/*"simscene.mysql.ukraine.com.ua"*/"localhost", $username, $password) or die("Не могу соединиться с MySQLI.");

// Set the active MySQL database
$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");

/*if (!$db_selected) {
die ('Can\'t use db : ' . mysql_error());
}*/

mysql_query('SET NAMES utf8');
header("Content-type: text/html");

// Gets data from URL parameters
$code = $_POST['code'];
$name = $_POST['name']; //utf8_urldecode()
//$address = $_POST['address']; //utf8_urldecode(
$lat = $_POST['lat']; // перевірити тип!
$lng = $_POST['lng']; // перевірити тип!
if (isset($_POST['city'])) {
	$city = $_POST['city'];
}
// перевірити тип!
$description = $_POST['description'];
$scenery = $_POST['scenery'];
$scenery_free = $_POST['scenery_free'];

if (isset($scenery_free) && isset($scenery) && !empty($scenery) && !empty($scenery_free)) {
	$type = 2;
} else if (isset($_POST['scenery_free']) && !empty($scenery_free)) {
	$type = 0;
} else if (isset($_POST['scenery']) && !empty($scenery)) {
	$type = 1;
}
//$city = $_POST['city'];
//$country = $_POST['country'];

/*function utf8_urldecode($str) {
$str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\1;",urldecode($str));

return html_entity_decode($str,null,'UTF-8');
}*/

$filetype = "";
$filetype_tmp = "";
if (isset($_FILES['filename'])) {
	foreach ($_FILES['filename']['name'] as $k => $f) {
		$filetype_tmp = substr($_FILES['filename']['name'][$k], strripos($_FILES['filename']['name'][$k], ".", 0), 4);
		$filetype .= substr($_FILES['filename']['name'][$k], strripos($_FILES['filename']['name'][$k], ".", 0) + 1, 4);
		//перевірити й доробити
		if (($f + 1) != $k) {$filetype .= ",";}
		//if (!$_FILES['filename']['error'][$k]) {
		//if (iconv(in_charset, out_charset, str)s_uploaded_file($_FILES['filename']['tmp_name'][$k])) {
		move_uploaded_file($_FILES['filename']['tmp_name'][$k], "../img/" . $code . $k . $filetype_tmp);
		//echo 'Файл: ' . $_FILES['filename']['name'][$k] . ' загружен.<br />';

		//}
		//}
	}
} else {echo ("file doesn't load");}
//коряво
if ($filetype == ",") {
	$filetype = null;
}

// Insert new row with user data
$query_marker = sprintf("INSERT INTO marker " .
	" (code, name, lat, lng, type, images, city )" .
	" VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s');",
	mysql_real_escape_string($code),
	mysql_real_escape_string($name),
	mysql_real_escape_string($lat),
	mysql_real_escape_string($lng),
	mysql_real_escape_string($type),
	mysql_real_escape_string($filetype),
	mysql_real_escape_string($city));

$result_marker = mysql_query($query_marker) or die('Invalid query: ' . mysql_error());

/*$sql = "SELECT max(id) FROM `marker`";
$result = mysql_query($sql);
$row = @mysql_fetch_array($result);
$id = max($row);*/
echo $code;

/*$query_window = sprintf("INSERT INTO marker_window " .
" (code, address, city, country )" .
" VALUES ('%s', '%s', '%s','%s');",
mysql_real_escape_string($code),
mysql_real_escape_string($address),
mysql_real_escape_string($city),
mysql_real_escape_string($country));*/

//$result_window = mysql_query($query_window) or die('Invalid query: ' . mysql_error());

$queryinfo = sprintf("INSERT INTO markerinfo " .
	" (code, description, scenery, scenery_free )" .
	" VALUES ('%s', '%s', '%s', '%s');",
	mysql_real_escape_string($code),
	mysql_real_escape_string($description),
	mysql_real_escape_string($scenery),
	mysql_real_escape_string($scenery_free));

$resultinfo = mysql_query($queryinfo) or die('Invalid query: ' . mysql_error());

mysql_close($connection);

?>