<?php
require("phpsqlajax_dbinfo.php");


// Opens a connection to a MySQL server
$connection = mysql_connect('localhost', $username, $password);
if (!$connection) {  die('Not connected : ' . mysql_error());} 
 
// Set the active MySQL database
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
} 
 
mysql_query('SET NAMES utf8');

 
function utf8_urldecode($str) {
    $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\1;",urldecode($str));
    return html_entity_decode($str,null,'UTF-8');
  }
 
// Gets data from URL parameters
$name = utf8_urldecode($_GET['name']);
$address = utf8_urldecode($_GET['address']);
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$type = $_GET['type'];
 
// Insert new row with user data
$query = sprintf("INSERT INTO markers " .
         " (id, name, address, lat, lng, type ) " .
         " VALUES (NULL, '%s', '%s', '%s', '%s', '%s');",
         mysql_real_escape_string($name),
         mysql_real_escape_string($address),
         mysql_real_escape_string($lat),
         mysql_real_escape_string($lng),
         mysql_real_escape_string($type));
 
$result = mysql_query($query);
 
if (!$result) {
  die('Invalid query: ' . mysql_error());
}
 
?>