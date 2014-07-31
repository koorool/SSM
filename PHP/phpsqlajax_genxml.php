<?php

require ("phpsqlajax_dbinfo.php");

// Start XML file, create parent node

$dom     = new DOMDocument("1.0");
$node    = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a MySQL server

$connection = mysql_connect("simscene.mysql.ukraine.com.ua", $username, $password) or die("Не могу соединиться с MySQLI.");

//int mysql_errno([ resource $link_identifier = NULL ] );
//if (!$connection) {  die('Not connected : ' . mysql_error());} //or die

// Set the active MySQL database

$db_selected = mysql_select_db($database) or die("Не могу соединиться с MySQLI.");
//, $connection);
/*if (!$db_selected) {
die ('Can\'t use db : ' . mysql_error());
}*/

// Select all the rows in the marker table

$query  = "SELECT name,lat,lng,Freeware FROM marker";
$result = mysql_query($query);
if (!$result) {
	die('Invalid query: '.mysql_error());
}

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each

while ($row = @mysql_fetch_assoc($result)) {
	// ADD TO XML DOCUMENT NODE
	$node    = $dom->createElement("marker");
	$newnode = $parnode->appendChild($node);
	$newnode->setAttribute("name", $row['name']);
	// $newnode->setAttribute("address", $row['address']);
	$newnode->setAttribute("lat", $row['lat']);
	$newnode->setAttribute("lng", $row['lng']);
	$newnode->setAttribute("type", $row['Freeware']);
}

echo $dom->saveXML();

//mysql_free_result($result);

?>
