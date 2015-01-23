<?php

require "dbinfo.php";

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markerinfo");
$parnode = $dom->appendChild($node);

// Opens a connection to a MySQL server

$connection = mysql_connect(/*"simscene.mysql.ukraine.com.ua"*/"localhost", $username, $password) or die("Не могу соединиться с MySQLI.");

// Set the active MySQL database

mysql_query('SET NAMES utf8');
$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");
//$echo_text = "";
// Select all the rows in the marker table
/*function utf8_urldecode($str) {
$str = preg_replace("/%u([0-9a-f]{3,4})/i", "&#x\1;", urldecode($str));
return html_entity_decode($str, null, 'UTF-8');
}*/

// Gets data from URL parameters
$code = $_GET['code'];
$type = $_GET['type'];

$query = "SELECT images  FROM marker WHERE code='" . $code . "'";
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
while ($row = @mysql_fetch_assoc($result)) {
	$images = $row['images'];
}

header("Content-type: text/xml");
switch ($type) {
	case 0:
		$query = "SELECT description, scenery_free, scenery_free_label  FROM markerinfo WHERE code='" . $code . "'";
		$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
		while ($row = @mysql_fetch_assoc($result)) {
			//$echo_text = $row['description'] . "," . $row['sim'] . $row['scenery'];
			$node = $dom->createElement("marker");
			$newnode = $parnode->appendChild($node);
			$newnode->setAttribute("description", $row['description']);
			$newnode->setAttribute("scenery_free", $row['scenery_free']);
			//$newnode->setAttribute("scenery", $row['scenery']);
			$newnode->setAttribute("images", $images);
			//$newnode->setAttribute("scenery_label", $row['scenery_label']);
			$newnode->setAttribute("scenery_free_label", $row['scenery_free_label']);
		}
		break;
	case 1:
		$query = "SELECT description, scenery, scenery_label  FROM markerinfo WHERE code='" . $code . "'";
		$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
		while ($row = @mysql_fetch_assoc($result)) {
			//$echo_text = $row['description'] . "," . $row['sim'] . $row['scenery'];
			$node = $dom->createElement("marker");
			$newnode = $parnode->appendChild($node);
			//$newnode->setAttribute("code", $row['code']);
			$newnode->setAttribute("description", $row['description']);
			// $newnode->setAttribute("address", $row['address']);
			//$newnode->setAttribute("scenery_free", $row['scenery_free']);
			$newnode->setAttribute("scenery", $row['scenery']);
			$newnode->setAttribute("images", $images);
			$newnode->setAttribute("scenery_label", $row['scenery_label']);
			//$newnode->setAttribute("scenery_free_label", $row['scenery_free_label']);
		}
		break;
	case 2:
		$query = "SELECT description, scenery_free, scenery, scenery_label, scenery_free_label  FROM markerinfo WHERE code='" . $code . "'";
		$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
		while ($row = @mysql_fetch_assoc($result)) {
			//$echo_text = $row['description'] . "," . $row['sim'] . $row['scenery'];
			$node = $dom->createElement("marker");
			$newnode = $parnode->appendChild($node);
			//$newnode->setAttribute("code", $row['code']);
			$newnode->setAttribute("description", $row['description']);
			// $newnode->setAttribute("address", $row['address']);
			$newnode->setAttribute("scenery_free", $row['scenery_free']);
			$newnode->setAttribute("scenery", $row['scenery']);
			$newnode->setAttribute("images", $images);
			$newnode->setAttribute("scenery_label", $row['scenery_label']);
			$newnode->setAttribute("scenery_free_label", $row['scenery_free_label']);
		}
		break;
}

//$query = "SELECT description, scenery_free, scenery, scenery_label, scenery_free_label  FROM markerinfo WHERE code='" . $code . "'";

// Iterate through the rows, adding XML nodes for each

//echo $echo_text;
echo $dom->saveXML();
mysql_close($connection);

?>