<?php

//$name = $_GET['name']; //ex ./img/brdc1.png
$name = "./img/Ciro0.png";
//get the index of the deleted file
$index = substr($name, 10, strripos($name, ".", 10) - 10);
//get the filepath to find other files
$path = "." . substr($name, 0, 10);
$arr = glob($path . "*");
//$filename1 = $arr[0]
$newindex = $index + 1;
unlink("." . $name);
while ($newindex < count($arr)) {
//$newname = "." . $file . ($index) . strrchr($arr[$index], ".");
	//echo $arr[$index];
	rename((string) $arr[$newindex], $path . $index . strrchr($arr[$newindex], "."));
	$index++;
	$newindex++;
}
//echo $count;
?>