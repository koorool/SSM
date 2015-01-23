<?php

require "dbinfo.php";

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a MySQL server

$connection = mysql_connect(/*"simscene.mysql.ukraine.com.ua"*/"localhost", $username, $password) or die("Не могу соединиться с MySQLI.");

mysql_query("SET NAMES 'utf8'");
//int mysql_errno([ resource $link_identifier = NULL ] );
//if (!$connection) {  die('Not connected : ' . mysql_error());} //or die

// Set the active MySQL database

$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");
$type = $_GET['type'];
//$code = isset($_GET['code']);

// Select all the rows in the marker table
if ($type == "-1") {
	$query = "SELECT code,name,lat,lng,type,city FROM marker";
/*} else if ($type == "-1" && isset($_GET['code'])) {
$query = "SELECT code,name,lat,lng,type FROM marker WHERE code='" . $_GET['code'] . "'";*/
} else {
	$query = "SELECT code,name,lat,lng,type,city FROM marker WHERE type= '" . $type . "'";
}

//$query  = "SELECT name,lat,lng,Freeware FROM marker";
$result = mysql_query($query) or die('Invalid query: ' . mysql_error()); //'SET NAMES "utf8"'
/*if (!$result) {
die('Invalid query: '.mysql_error());
}*/

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each

while ($row = @mysql_fetch_assoc($result)) {
	// ADD TO XML DOCUMENT NODE
	$node = $dom->createElement("marker");
	$newnode = $parnode->appendChild($node);
	$newnode->setAttribute("code", $row['code']);
	$newnode->setAttribute("name", $row['name']);
	$newnode->setAttribute("lat", $row['lat']);
	$newnode->setAttribute("lng", $row['lng']);
	$newnode->setAttribute("type", $row['type']);
	if (empty($row['city'])) {
		$newnode->setAttribute("city", "null");
	} else {
		$newnode->setAttribute("city", $row['city']);
	}

}

echo $dom->saveXML();
mysql_close($connection);

?>