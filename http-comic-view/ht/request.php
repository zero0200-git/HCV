<?php
header('Content-Type: application/json');
$DEFAULTMAIN = "img/";
$MAIN = $DEFAULTMAIN;
function getSubDir($lo,$e) {
$dir = array("subDir"=>0,"subDirList"=>array());
$arr = array_values(array_diff(scandir(substr($lo,0,-1)), array('..', '.')));
natsort($arr);
foreach ($arr as $chd) {
if (is_dir($lo.$chd)) {
	if (getPic($lo.$chd) !== array()) {
		$dir["subDirList"][$dir["subDir"]][] = $lo.$chd;
		$dir["subDirList"][$dir["subDir"]][] = getPic($lo.$chd)[0];
	} else {
		$dir["subDirList"][$dir["subDir"]][] = $lo.$chd;
		$dir["subDirList"][$dir["subDir"]][] = "notvalid";
	}
	
	$dir["subDir"]++;
}
}
if($e===1) {$re=$dir["subDir"];} elseif($e===2) {$re=$dir["subDirList"];} else {$re=$dir;}
return $re;
}
function getSubDirList($lo,$e=null) {
$parent_sp = "_s.pp,";
$child_sp = "_s.pc,";
$arr = array_values(array_diff(scandir(substr($lo,0,-1)), array('..', '.')));
natsort($arr);
if (getPic($lo) !== array()) {
	$dir = $lo.$child_sp.getPic($lo)[0];
} else {
	$dir = $lo.$child_sp."notvalid";
}
foreach ($arr as $chd) {
	if (is_dir($lo.$chd)) {
		$dir = $dir.$parent_sp.getSubDirList($lo.$chd."/","text");
	}
}
$re = array();

foreach(explode($parent_sp,$dir) as $r) {
	$re["list"][] = explode($child_sp,$r);
}

foreach(explode($parent_sp,$dir) as $r) {
	if (explode($child_sp,$r)[1] !== "notvalid") {
		$re["valid"][] = explode($child_sp,$r);
	}
}

foreach(explode($parent_sp,$dir) as $r) {
	if (explode($child_sp,$r)[1] === "notvalid") {
		$re["notvalid"][] = explode($child_sp,$r);
	}
}

$re["num"] = count(explode($parent_sp,$dir));

$re["text"] = $dir;
if (strtolower($e) === "text") {
	$re = $dir;
} elseif (strtolower($e) === "list") {
	$re = $re["list"];
}

return $re;
}
function getPic($lo) {
$re = array();
foreach(glob(str_replace(['[',']',"\f[","\f]"], ["\f[","\f]",'[[]','[]]'], $lo)."/*.*") as $file) {
	if(preg_match('/(png|jpg|jpeg)/i', $file)) {
		$re[] = str_replace($lo."/","",$file);
	}
}
natsort($re);
return array_values($re);
}
function getCurrentDir($lo,$e = null) {
$sDir = getSubDirList($lo);
if ($e === 1) {
	$ar = array("curDir"=>$lo, "picList"=>getPic($lo), "subDir"=>getSubDir($lo,1), "subDirList"=>getSubDir($lo,2));
} else {
	$ar = array("curDir"=>$lo, "allDirNo"=>$sDir["num"], "allDirList"=>$sDir["list"], "allDirValid"=>$sDir["valid"], "allDirNotValid"=>$sDir["notvalid"]);
}
return $ar;
}
if ($_GET["p"] == null){echo json_encode(getCurrentDir($MAIN), JSON_UNESCAPED_UNICODE);}
elseif ($_GET["p"] != null){echo json_encode(getCurrentDir($_GET["p"],1), JSON_UNESCAPED_UNICODE);}
?>