<?php
$name = $_GET['name']; //ex ../img/brdc1.png
//get the index of the deleted file
$index = substr($name, 11, strripos($name, ".", 11) - 11);
//get the filepath to find other files
$arr = glob(substr($name, 0, 11) . "*");
unlink($name);
while ($index + 1 < count($arr)) {
	rename((string) $arr[$index + 1], substr($name, 0, 11) . $index . strrchr($arr[$index + 1], "."));
	$index++;
}
?>