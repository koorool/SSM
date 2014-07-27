<?php

function utf8_urldecode($str) {
    $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\1;",urldecode($str));
    return html_entity_decode($str,null,'UTF-8');
  }
 
// Gets data from URL parameters
$login = utf8_urldecode($_GET['login']);
$pass = utf8_urldecode($_GET['password']);
if ($pass == mypass && $login == login) 
	echo true;
else 
	echo false;
?>