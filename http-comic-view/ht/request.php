<?php
header("Content-Type: application/json; charset=UTF-8");
$DEFAULTMAIN="img/";
$MAIN=$DEFAULTMAIN;
include "config.php";

function getSubDir($lo) {
$dir=array("subDir"=>0,"subDirList"=>array(),"dirValid"=>array(),"dirNotValid"=>array());
$arr=array_values(array_diff(scandir(substr($lo,0,-1)), array('..', '.')));
natsort($arr);
foreach ($arr as $chd) {
if (is_dir($lo.$chd)) {
	if (getPic($lo.$chd) !==array()) {
		$pic=getPic($lo.$chd);
		$sub=getSubDirNum($lo.$chd."/");
		$dir["subDirList"][]=["path"=>$lo.$chd."/","name"=>$chd,"pic"=>$pic[0],"picNum"=>count($pic),"subDir"=>$sub];
		$dir["dirValid"][]=["path"=>$lo.$chd."/","name"=>$chd,"pic"=>$pic[0],"picNum"=>count($pic),"subDir"=>$sub];
	} else {
		$sub=getSubDirNum($lo.$chd."/");
		$dir["subDirList"][]=["path"=>$lo.$chd."/","name"=>$chd,"pic"=>"notvalid","picNum"=>0,"subDir"=>$sub];
		$dir["dirNotValid"][]=["path"=>$lo.$chd."/","name"=>$chd,"pic"=>"notvalid","picNum"=>0,"subDir"=>$sub];
	}
	$dir["subDir"]++;
}
}
return $dir;
}
function getSubDirNum($lo) {
$dir=0;
$arr=array_values(array_diff(scandir(substr($lo,0,-1)), array('..', '.')));
foreach ($arr as $chd) {
if (is_dir($lo.$chd)) {
	$dir++;
}
}
return $dir;
}
	
function getSubDirResc($lo,$e=null) {
$parent_sp="_s.pp,";
$child_sp="_s.pc,";
$arr=array_values(array_diff(scandir(substr($lo,0,-1)), array('..', '.')));
natsort($arr);
$pic=getPic($lo);
$sub=getSubDirNum($lo."/");
if ($pic!==array()) {
	$dir=$lo.$child_sp.getDirName($lo).$child_sp.$pic[0].$child_sp.count($pic).$child_sp.$sub;
} else {
	$dir=$lo.$child_sp.getDirName($lo).$child_sp."notvalid".$child_sp."0".$child_sp.$sub;
}
foreach ($arr as $chd) {
if (is_dir($lo.$chd)) {
	$dir=$dir.$parent_sp.getSubDirResc($lo.$chd."/","text");
}
}
$re=array();

foreach(explode($parent_sp,$dir) as $r) {
$r=explode($child_sp,$r);
$re["list"][]=["path"=>$r[0],"name"=>$r[1],"pic"=>$r[2],"picNum"=>(int)$r[3],"subDir"=>$r[4]];
if ($r[2]!=="notvalid") {
$re["valid"][]=["path"=>$r[0],"name"=>$r[1],"pic"=>$r[2],"picNum"=>(int)$r[3],"subDir"=>$r[4]];
}
if ($r[2]==="notvalid") {
$re["notvalid"][]=["path"=>$r[0],"name"=>$r[1],"pic"=>$r[2],"picNum"=>(int)$r[3],"subDir"=>$r[4]];
}
}

$re["num"]=count(explode($parent_sp,$dir));

$re["text"]=$dir;
if (strtolower($e)==="text") {
	$re=$dir;
} elseif (strtolower($e)==="list") {
	$re=$re["list"];
}

return $re;
}

function getPic($lo) {
$re=array();
foreach(glob(str_replace(['[',']',"\f[","\f]"], ["\f[","\f]",'[[]','[]]'], $lo)."/*.*") as $file) {
	if(preg_match('/(\.png|\.jpg|\.jpeg|\.webp)/i', substr($file,-5))) {
	$re[]=str_replace($lo."/","",$file);
}
}
natsort($re);
return array_values($re);
}

function getPNB($lo) {
if(strripos($lo,"/",-2)==false) {
	$re["previous"]="";
	$re["next"]="";
	$re["back"]="";
}else {
	$dir=getSubDir(substr($lo,0,strripos($lo,"/",-2)+1))["subDirList"];
	$current=array_search($lo,array_column($dir,"path"));
	if ($current-1 >=0) {
		$re["previous"]=$dir[$current-1];
	} else {$re["previous"]="";}
	if ($current+1 <=count($dir)-1) {
		$re["next"]=$dir[$current+1];
	} else {$re["next"]="";}
	$re["back"]=substr($lo,0,strripos($lo,"/",-2)+1);
}

return $re;
}

function getDirName($lo) {
$re=explode("/",$lo);
foreach($re as $na) {
	if($na !="" || $na !=null) {
	$re=$na;
}
}
return $re;
}


function getCurrentDir($lo,$e=null) {
if ($e===1) {
	$lo=preg_replace("/(\\|\/)+/","/",$lo);
	$pnbDir=getPNB($lo);
	$sDir=getSubDir($lo);
	$pic=getPic($lo);
	$ar=array("path"=>$lo, "name"=>getDirName($lo), "picList"=>getPic($lo), "picNum"=>sizeof($pic), "previousDir"=>$pnbDir["previous"], "nextDir"=>$pnbDir["next"], "backDir"=>$pnbDir["back"], "subDir"=>$sDir["subDir"], "dirList"=>$sDir["subDirList"], "dirValid"=>$sDir["dirValid"], "dirNotValid"=>$sDir["dirNotValid"]);
} else {
	$sDir=getSubDirResc($lo);
	$ar=array("path"=>$lo, "name"=>getDirName($lo), "allDirNo"=>$sDir["num"], "dirList"=>$sDir["list"], "dirValid"=>$sDir["valid"], "dirNotValid"=>$sDir["notvalid"]);
}
if ($lo==null||$lo=="") {$ar="";}
return $ar;
}


if (strtolower($_POST["type"])=="main"){echo json_encode($MAIN, JSON_UNESCAPED_UNICODE);}
elseif (strtolower($_POST["type"])=="all"){echo json_encode(getCurrentDir($MAIN), JSON_UNESCAPED_UNICODE);}
elseif (strtolower($_POST["type"])=="specific" && $_POST["p"]!=null && (is_dir($MAIN.$_POST["p"])==true || is_dir($MAIN.substr_replace($_POST["p"],"",stripos($_POST["p"],$MAIN),stripos($_POST["p"],$MAIN)+strlen($MAIN)))==true)){echo json_encode(getCurrentDir($_POST["p"],1), JSON_UNESCAPED_UNICODE);}

?>