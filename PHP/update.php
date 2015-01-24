<?php
require "dbinfo.php";

$code = $_POST['code'];
$name = $_POST['name'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$description = $_POST['description'];
$scenery = $_POST['scenery'];
$scenery_free = $_POST['scenery_free'];
$scenery_label = $_POST['scenery_label'];
$scenery_free_label = $_POST['scenery_free_label'];

if (isset($_POST['city'])) {
	$city = $_POST['city'];
}

if (isset($scenery_free) && isset($scenery) && !empty($scenery) && !empty($scenery_free)) {
	$type = 2;
	if (isset($_POST['scenery_free1']) && !empty($_POST['scenery_free1'])) {
		$scenery_free .= ";" . $_POST['scenery_free1'];
	}
	if (isset($_POST['scenery_free_label1']) && !empty($_POST['scenery_free_label1'])) {
		$scenery_free_label .= ";" . $_POST['scenery_free_label1'];
	}

} else if (isset($_POST['scenery_free']) && !empty($scenery_free)) {
	$type = 0;
	if (isset($_POST['scenery_free1']) && !empty($_POST['scenery_free1'])) {
		$scenery_free .= ";" . $_POST['scenery_free1'];
	}
	if (isset($_POST['scenery_free_label1']) && !empty($_POST['scenery_free_label1'])) {
		$scenery_free_label .= ";" . $_POST['scenery_free_label1'];
	}

} else if (isset($_POST['scenery']) && !empty($scenery)) {
	$type = 1;
	if (isset($_POST['scenery1']) && !empty($_POST['scenery1'])) {
		$scenery_free .= ";" . $_POST['scenery1'];
	}
	if (isset($_POST['scenery_label1']) && !empty($_POST['scenery_label1'])) {
		$scenery_free_label .= ";" . $_POST['scenery_label1'];
	}

}

$connection = mysql_connect(/*"simscene.mysql.ukraine.com.ua"*/"localhost", $username, $password) or die("Не могу соединиться с MySQLI.");

$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");

mysql_query('SET NAMES utf8');

$query = "UPDATE marker SET name='$name',lat='$lat',lng='$lng',type='$type', city='$city' WHERE code='$code'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

/*$query = "UPDATE marker_window SET address='$address',city='$city',country='$country' WHERE code='$code'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());*/

$query = "UPDATE markerinfo SET scenery='$scenery',description='$description',scenery_free='$scenery_free',scenery_free_label='$scenery_free_label',scenery_label='$scenery_label' WHERE code='$code'";

$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

mysql_close($connection);

//$filetype = "";
/*$query = "SELECT images FROM marker WHERE code='$code'";
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
while ($row = @mysql_fetch_assoc($result)) {
$i = substr_count($row['images'], ",");
$filetype = $row['images'];
}*/
$i = 0;
foreach (glob("../img/" . $code . "*") as $filename) {
	$i++;
}

//$filetype_tmp = "";
if (isset($_FILES['filename'])) {
	foreach ($_FILES['filename']['name'] as $k => $f) {
		//$filetype .= ",";
		$filetype_tmp = substr($_FILES['filename']['name'][$k], strripos($_FILES['filename']['name'][$k], ".", 0), 4);
		//$filetype .= substr($_FILES['filename']['name'][$k], strripos($_FILES['filename']['name'][$k], ".", 0) + 1, 4);
		//if (!$_FILES['filename']['error'][$k]) {
		//if (iconv(in_charset, out_charset, str)s_uploaded_file($_FILES['filename']['tmp_name'][$k])) {
		//if (($f + 1) != $k) {$filetype .= ",";}
		move_uploaded_file($_FILES['filename']['tmp_name'][$k], "../img/" . $code . $i . $filetype_tmp);
		//echo 'Файл: ' . $_FILES['filename']['name'][$k] . ' загружен.<br />';
		$i++;
		//}
		//}
	}
} else {echo ("file doesn't load");}

/*if ($filetype == ",") {
$filetype = null;
}*/

//$images = $row['images'] . $filetype;

?>