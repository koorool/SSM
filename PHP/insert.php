<?php
require "dbinfo.php";

// Gets data from URL parameters
$code = $_POST['code'];
$name = $_POST['name'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
//if (isset($_POST['city'])) {
$city = $_POST['city'];
//} else {
//$city = null;
//}

$description = $_POST['description'];
$scenery = $_POST['scenery'];
$scenery_free = $_POST['scenery_free'];

if (isset($scenery_free) && isset($scenery) && !empty($scenery) && !empty($scenery_free)) {
	$type = 2;
	if (isset($_POST['scenery_free_label']) && !empty($_POST['scenery_free_label'])) {
		$scenery_free_label = $_POST['scenery_free_label'];
		if (isset($_POST['scenery_free1']) && !empty($_POST['scenery_free1'])) {
			$scenery_free .= ";" . $_POST['scenery_free1'];
		}
		if (isset($_POST['scenery_free_label1']) && !empty($_POST['scenery_free_label1'])) {
			$scenery_free_label .= ";" . $_POST['scenery_free_label1'];
		}
	}
	if (isset($_POST['scenery_label']) && !empty($_POST['scenery_label'])) {
		$scenery_label = $_POST['scenery_label'];
		if (isset($_POST['scenery1']) && !empty($_POST['scenery1'])) {
			$scenery .= ";" . $_POST['scenery1'];
		}
		if (isset($_POST['scenery_label1']) && !empty($_POST['scenery_label1'])) {
			$scenery_label .= ";" . $_POST['scenery_label1'];
		}
	}
	$query_info = "INSERT INTO markerinfo " .
	"(code, description, scenery, scenery_free, scenery_label, scenery_free_label )" .
	"VALUES('$code','$description', '$scenery', '$scenery_free', '$scenery_label', '$scenery_free_label')";

} else if (isset($_POST['scenery_free']) && !empty($scenery_free)) {
	$type = 0;
	if (isset($_POST['scenery_free_label']) && !empty($_POST['scenery_free_label'])) {
		$scenery_free_label = $_POST['scenery_free_label'];
		if (isset($_POST['scenery_free1']) && !empty($_POST['scenery_free1'])) {
			$scenery_free .= ";" . $_POST['scenery_free1'];
		}
		if (isset($_POST['scenery_free_label1']) && !empty($_POST['scenery_free_label1'])) {
			$scenery_free_label .= ";" . $_POST['scenery_free_label1'];
		}
	}
	$query_info = "INSERT INTO markerinfo " .
	"(code, description, scenery_free, scenery_free_label )" .
	"VALUES('$code','$description', '$scenery_free', '$scenery_free_label')";

} else if (isset($_POST['scenery']) && !empty($scenery)) {
	$type = 1;
	if (isset($_POST['scenery_label']) && !empty($_POST['scenery_label'])) {
		$scenery_label = $_POST['scenery_label'];
		if (isset($_POST['scenery1']) && !empty($_POST['scenery1'])) {
			$scenery .= ";" . $_POST['scenery1'];
		}
		if (isset($_POST['scenery_label1']) && !empty($_POST['scenery_label1'])) {
			$scenery_label .= ";" . $_POST['scenery_label1'];
		}
	}
	$query_info = "INSERT INTO markerinfo " .
	"(code, description, scenery, scenery_label )" .
	"VALUES('$code','$description', '$scenery', '$scenery_label')";
}

//$filetype = "";
//$filetype_tmp = "";
if (isset($_FILES['filename'])) {
	foreach ($_FILES['filename']['name'] as $k => $f) {
		//$filetype_tmp = substr($_FILES['filename']['name'][$k], strripos($_FILES['filename']['name'][$k], ".", 0), 4);
		//$filetype .= substr($_FILES['filename']['name'][$k], strripos($_FILES['filename']['name'][$k], ".", 0) + 1, 4);
		//перевірити й доробити
		//if (($f + 1) != $k) {$filetype .= ",";}
		//if (!$_FILES['filename']['error'][$k]) {
		//if (iconv(in_charset, out_charset, str)s_uploaded_file($_FILES['filename']['tmp_name'][$k])) {
		move_uploaded_file($_FILES['filename']['tmp_name'][$k], "../img/" . $code . $k . substr($_FILES['filename']['name'][$k], strripos($_FILES['filename']['name'][$k], ".", 0), 4));
		//echo 'Файл: ' . $_FILES['filename']['name'][$k] . ' загружен.<br />';

		//}
		//}
	}
} else {echo ("file doesn't load");}

/*if ($filetype == ",") {
$filetype = null;
}*/

// Opens a connection to a MySQL server
$connection = mysql_connect($host, $username, $password) or die("Не могу соединиться с MySQLI.");

// Set the active MySQL database
$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");
mysql_query('SET NAMES utf8');

$query = "INSERT INTO marker " .
"(code, name, lat, lng, type, city)" .
"VALUES('$code','$name','$lat','$lng', '$type', '$city')";

/*$query_marker = sprintf("INSERT INTO marker " .
" (code, name, lat, lng, type, images, city )" .
" VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s');",
mysql_real_escape_string($code),
mysql_real_escape_string($name),
mysql_real_escape_string($lat),
mysql_real_escape_string($lng),
mysql_real_escape_string($type),
mysql_real_escape_string($filetype),
mysql_real_escape_string($city));*/

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

/*$queryinfo = sprintf("INSERT INTO markerinfo " .
" (code, description, scenery, scenery_free )" .
" VALUES ('%s', '%s', '%s', '%s');",
mysql_real_escape_string($code),
mysql_real_escape_string($description),
mysql_real_escape_string($scenery),
mysql_real_escape_string($scenery_free));*/

$result = mysql_query($query_info) or die('Invalid query: ' . mysql_error());

mysql_close($connection);

header("Content-type: text/plain");
echo $code;

?>