<?php  

require("phpsqlajax_dbinfo.php"); 

// Start XML file, create parent node

mysql_query('SET NAMES utf8');

$dom = new DOMDocument("1.0");
$node = $dom->createElement("marker_window");
$parnode = $dom->appendChild($node); 

// Opens a connection to a MySQL server

$connection = mysql_connect("simscene.mysql.ukraine.com.ua", $username, $password) or die ("Не могу соединиться с MySQLI.");

// Set the active MySQL database

$db_selected = mysql_select_db($database) or die ("Не могу соединиться с MySQLI."); 

// Select all the rows in the marker table
function utf8_urldecode($str) {
    $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\1;",urldecode($str));
    return html_entity_decode($str,null,'UTF-8');
  }
 
// Gets data from URL parameters
$name = utf8_urldecode($_GET['name']);

$query = "SELECT address, city, country FROM marker_window WHERE name ='".$name."'";
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

header("Content-type: text/xml"); 

// Iterate through the rows, adding XML nodes for each

while ($row = @mysql_fetch_assoc($result)){  
  // ADD TO XML DOCUMENT NODE  
  $node = $dom->createElement("marker");  
  $newnode = $parnode->appendChild($node);   
  //$newnode->setAttribute("name",$row['name']);  
  $newnode->setAttribute("address", $row['address']);  
  $newnode->setAttribute("city", $row['city']);  
  $newnode->setAttribute("country", $row['country']);  
} 

echo $dom->saveXML();

//mysql_free_result($result);

?>
