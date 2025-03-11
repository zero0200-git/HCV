<?php
header("Content-Type: application/json; charset=UTF-8");
$DEFAULTMAIN="img/";
$MAIN=$DEFAULTMAIN;
$inclWL=array();
$blockWL=array();
require "config.php";
if(is_dir($MAIN)!=true){$MAIN=$DEFAULTMAIN;}
if($inclWS!=null){$inclWL=array_merge($inclWL,explode("_s.spl.",str_replace("_s.quote.",",",preg_replace("/\s*,\s*/","_s.spl.",preg_replace("/\\\\,/","_s.quote.",preg_replace("/^\s*|\s*$/","",$inclWS))))));}
if($blockWS!=null){$blockWL=array_merge($blockWL,explode("_s.spl.",str_replace("_s.quote.",",",preg_replace("/\s*,\s*/","_s.spl.",preg_replace("/\\\\,/","_s.quote.",preg_replace("/^\s*|\s*$/","",$blockWS))))));}

function checkIB($value,$ib="b"){
$w=array();
if(strtolower($ib)=="i"){
	global $inclWL;
	$w=$inclWL;
	if(count($w)<1){return true;}
	$co=0;
	foreach($w as $word){if(stripos($value,$word)!==false){$co++;}}
	if($co==count($w)){return true;}
}
if(strtolower($ib)=="b"){
	global $blockWL;
	$w=$blockWL;
	if(count($w)<1){return false;}
	foreach($w as $word){if(stripos($value,$word)!==false){return true;}}
	return false;
}
}
function getSubDir($lo) {
$dir=array("subDir"=>0,"subDirList"=>array(),"dirValid"=>array(),"dirNotValid"=>array());
$arr=array_values(array_diff(scandir(substr($lo,0,-1)), array('..', '.')));
natcasesort($arr);
foreach ($arr as $chd) {
if (is_dir($lo.$chd)&&checkIB($chd,"i")===true&&checkIB($chd,"b")===false) {
	if (getPic($lo.$chd)!==array()) {
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
natcasesort($arr);
$pic=getPic($lo);
$sub=getSubDirNum($lo."/");
if ($pic!==array()) {
	$dir=$lo.$child_sp.getDirName($lo).$child_sp.$pic[0].$child_sp.count($pic).$child_sp.$sub;
} else {
	$dir=$lo.$child_sp.getDirName($lo).$child_sp."notvalid".$child_sp."0".$child_sp.$sub;
}
foreach ($arr as $chd) {
if (is_dir($lo.$chd)&&checkIB($chd,"i")===true&&checkIB($chd,"b")===false) {
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
	if(preg_match('/(\.png|\.jpg|\.jpeg|\.webp|\.gif)/i', substr($file,-5))) {
	$re[]=str_replace($lo."/","",$file);
}
}
natcasesort($re);
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
	$lo=preg_replace("/(\\\\|\/)+/","/",$lo."/");
	$pnbDir=getPNB($lo);
	$sDir=getSubDir($lo);
	$pic=getPic($lo);global $inclWL;global $blockWL;
	$ar=array("path"=>$lo, "name"=>getDirName($lo), "picList"=>getPic($lo), "picNum"=>sizeof($pic), "previousDir"=>$pnbDir["previous"], "nextDir"=>$pnbDir["next"], "backDir"=>$pnbDir["back"], "subDir"=>$sDir["subDir"], "dirList"=>$sDir["subDirList"], "dirValid"=>$sDir["dirValid"], "dirNotValid"=>$sDir["dirNotValid"]);
} elseif ($e===2) {
	$lo=preg_replace("/(\\\\|\/)+/","/",$lo."/");
	$pnbDir=getPNB($lo);
	$sDir=getSubDirResc($lo);
	$pic=getPic($lo);global $inclWL;global $blockWL;
	$ar=array("path"=>$lo, "name"=>getDirName($lo), "picList"=>getPic($lo), "picNum"=>sizeof($pic), "previousDir"=>$pnbDir["previous"], "nextDir"=>$pnbDir["next"], "backDir"=>$pnbDir["back"], "subDir"=>$sDir["subDir"], "allDirNo"=>$sDir["num"], "dirList"=>$sDir["list"], "dirValid"=>$sDir["valid"], "dirNotValid"=>$sDir["notvalid"]);
} else {
	$sDir=getSubDirResc($lo);
	$ar=array("path"=>$lo, "name"=>getDirName($lo), "allDirNo"=>$sDir["num"], "dirList"=>$sDir["list"], "dirValid"=>$sDir["valid"], "dirNotValid"=>$sDir["notvalid"]);
}
if ($lo==null||$lo=="") {$ar="";}
return $ar;
}
function getSettingValue($type="all"){
require "settings.php";
include "config.php";
$settings=[];
$settingsD=json_decode($settingsDefault,true);
$settingsC=json_decode($settingsConfig,true);
$key = array_keys($settingsD);

if(strtolower($type)=="all"){
foreach($key as $name){
	if(in_array($settingsD[$name]["type"],["dataExport","dataImport","color","key"])!=true){
		if(is_array($settingsC[$name])==true){$settings[$name]=array_merge($settingsD[$name],$settingsC[$name])["value"];}
		else{$settings[$name]=$settingsD[$name]["value"];}
	}
}
$settings["style"]=getSettingValue("style");
$settings["key"]=getSettingValue("key");
} elseif(strtolower($type)=="style"){
foreach($key as $name){
	if(in_array($settingsD[$name]["type"],["color"])==true){
		if(is_array($settingsC[$name])==true){$settings[$name]=array($settingsD[$name]["query"]=>array($settingsD[$name]["css"]=>array_merge($settingsD[$name],$settingsC[$name])["value"]));}
		else{$settings[$name]=array($settingsD[$name]["query"]=>array($settingsD[$name]["css"]=>$settingsD[$name]["value"]));}
	}
}
} elseif(strtolower($type)=="key"){
foreach($key as $name){
	if(in_array($settingsD[$name]["type"],["key"])==true){
		if(is_array($settingsC[$name])==true){$settings[$name]=array_map(function($x){if(join(",",$x)!=''){return join(",",$x);}},$settingsC[$name]["value"]);}
		else{$settings[$name]=array_map(function($x){if(join(",",$x)!=''){return join(",",$x);}},$settingsD[$name]["value"]);}
	}
}
}

return $settings;
}


if($_GET["i"]!=null){$inclWL=array_merge($inclWL,explode("_s.spl.",str_replace("_s.quote.",",",preg_replace("/\s*,\s*/","_s.spl.",preg_replace("/\\\\,/","_s.quote.",preg_replace("/^\s*|\s*$/","",$_GET["i"]))))));}
if($_GET["b"]!=null){$blockWL=array_merge($blockWL,explode("_s.spl.",str_replace("_s.quote.",",",preg_replace("/\s*,\s*/","_s.spl.",preg_replace("/\\\\,/","_s.quote.",preg_replace("/^\s*|\s*$/","",$_GET["b"]))))));}
if (strtolower($_GET["type"])=="main"){echo json_encode($MAIN, JSON_UNESCAPED_UNICODE);}
elseif (strtolower($_GET["type"])=="all"){echo json_encode(getCurrentDir($MAIN), JSON_UNESCAPED_UNICODE);}
elseif (strtolower($_GET["type"])=="specific" && $_GET["p"]!=null && (strtolower($MAIN)==strtolower($_GET["p"]) || strtolower($MAIN)==strtolower($_GET["p"]) || is_dir($MAIN.$_GET["p"])==true || is_dir($MAIN.substr_replace($_GET["p"],"",stripos($_GET["p"],$MAIN),stripos($_GET["p"],$MAIN)+strlen($MAIN)))==true)){echo json_encode(getCurrentDir($_GET["p"],1), JSON_UNESCAPED_UNICODE);}
elseif (strtolower($_GET["type"])=="specificrecusive" && $_GET["p"]!=null && (strtolower($MAIN)==strtolower($_GET["p"]) || strtolower($MAIN)==strtolower($_GET["p"]) || is_dir($MAIN.$_GET["p"])==true || is_dir($MAIN.substr_replace($_GET["p"],"",stripos($_GET["p"],$MAIN),stripos($_GET["p"],$MAIN)+strlen($MAIN)))==true)){echo json_encode(getCurrentDir($_GET["p"],2), JSON_UNESCAPED_UNICODE);}
elseif (strtolower($_GET["type"])=="settings"){echo json_encode(getSettingValue("all"), JSON_UNESCAPED_UNICODE);}

?>