<?php
$name = $_GET['name']; //ex ./img/brdc1.png
//get the index of the deleted file
$index = substr($name, 10, strripos($name, ".", 10) - 10);
//get the filepath to find other files
$path = "." . substr($name, 0, 10);
$arr = glob($path . "*");
unlink("." . $name);
while ($index + 1 < count($arr)) {
	rename((string) $arr[$index + 1], $path . $index . strrchr($arr[$index + 1], "."));
	$index++;
}
?>