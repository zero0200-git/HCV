<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes">
<title>Comic view</title>
<body>
<div class="nc" id="navWarpper">
<button class="button" id="prev"><svg viewBox="0 0 10 10">
<path d="M7,1 l-5,4 l5,4"/></svg></button>
<div class="text" id="cur">current</div>
<button class="button" id="next"><svg viewBox="0 0 10 10">
<path d="M3,1 l5,4 l-5,4"/></svg></button>
<button class="button" id="folderOpen"><svg viewBox="0 0 32 32">
<path d="M2 13v-6.008c0-0.537 0.444-0.992 0.992-0.992h10.408l1.96 4h12.637c0.549 0 1.003 0.448 1.003 1.001v1.999h-27zM2 14h27v10.999c0 0.556-0.445 1.001-0.993 1.001h-25.014c-0.547 0-0.993-0.444-0.993-0.992v-11.008zM16 9l-2-4h-10.997c-1.106 0-2.003 0.89-2.003 1.991v18.018c0 1.1 0.9 1.991 1.993 1.991h25.013c1.101 0 1.993-0.893 1.993-1.995v-14.010c0-1.102-0.897-1.995-2.006-1.995h-11.994z"/>
</svg></button>
<button class="button" id="settingsOpen"><svg viewBox="0 0 32 32">
<path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"/>
</svg></button>
</div>
<div id="settingsWarpper">
<div id="settingContainer" class="nc">
<p>Fullscreen</p>
<label id="fullscreenSwitch" class="switch"><input type="checkbox"><span class="sli"></span></label>


</div>

</div>
<div id="imgWarpper">
<div class="L nc"></div><div class="R nc"></div>
<div class="imgContener nc"></div></div>
<?php 
function getSubDir($lo,$e) {
$lo = $lo."/";
$dir = array("subDir"=>0,"subDirList"=>array(), "subDirMore"=>array());
foreach (array_values(array_diff(scandir($lo), array('..', '.'))) as $chd) {
	if (is_dir($lo.$chd)) {
		$dir["subDir"]++;
		$dir["subDirList"][] = $lo.$chd."/";
		$dir["subDirMore"][] = getCurrentDir($lo.$chd,1);
	}
}
if($e===1) {$re=$dir["subDir"];} elseif($e===2) {$re=$dir["subDirList"];} elseif($e===3) {$re=$dir["subDirMore"];} else {$dir;}
return $re;
}
function getSubDirList($lo,$e = null) {
$parent_sp = "_s.pp,";
$child_sp = "_s.pc,";
if (getPic($lo) !== array()) {
	$dir = $lo."/".$child_sp.getPic($lo)[0];
} else {
	$dir = $lo."/".$child_sp."notvalid";
}
foreach (array_values(array_diff(scandir($lo."/"), array('..', '.'))) as $chd) {
	if (is_dir($lo."/".$chd)) {
		$dir = $dir.$parent_sp.getSubDirList($lo."/".$chd,"text");
	}
}
	
if (strtolower($e) === "list") {
	$re = array();
	foreach(explode($parent_sp,$dir) as $r) {
		$re[] = explode($child_sp,$r);
	}
	$dir = $re;
} elseif (strtolower($e) === "valid") {
	$re = array();
	foreach(explode($parent_sp,$dir) as $r) {
		if (explode($child_sp,$r)[1] !== "notvalid") {
			$re[] = explode($child_sp,$r);
		}
	}
	$dir = $re;
} elseif (strtolower($e) === "notvalid") {
	$re = array();
	foreach(explode($parent_sp,$dir) as $r) {
		if (explode($child_sp,$r)[1] === "notvalid") {
			$re[] = explode($child_sp,$r);
		}
	}
	$dir = $re;
} elseif (strtolower($e) === "num") {
	$dir = count(explode($parent_sp,$dir));
} elseif (strtolower($e) === "text") {
} else {
	$dir = getSubDirList($lo,"list");
}

return $dir;
}
function getPic($lo) {
$re = array();
foreach(glob($lo."/*.*") as $file) {
	if(preg_match('/(png|jpg|jpeg)/i', $file)) {
		$re[] = $file;
	}
}
return $re;
}
function getCurrentDir($lo,$e = null) {
if ($e === 1) {
	$ar = array("curDir"=>$lo."/", "picList"=>getPic($lo), "subDir"=>getSubDir($lo,1), "subDirList"=>getSubDir($lo,2), "subDirList"=>getSubDir($lo,3));
} else {
	$ar = array("allDirNo"=>getSubDirList($lo,"num"), "allDirList"=>getSubDirList($lo,"list"), "allDirValid"=>getSubDirList($lo,"valid"), "allDirNotValid"=>getSubDirList($lo,"notvalid"), "curDir"=>$lo."/", "picList"=>getPic($lo), "subDir"=>getSubDir($lo,1), "subDirList"=>getSubDir($lo,2), "subDirList"=>getSubDir($lo,3));
}
return $ar;
}
/*
$v="img";
echo "<p style=\"color:#fff;white-space:pre-wrap;\">";
echo "\n<br>\n";
echo urlencode(getCurrentDir("img")["curDir"]);
echo "\n<br>\n";
print_r($_GET["p"]);
echo "\n<br>\n";
echo rawurlencode(getCurrentDir("img")["curDir"]);
echo "\n<br>\n";
print_r(getPic("img/e1")[0]);
echo "\n<br>\n";
print_r(getPic("img/e1")[0]);
echo "\n<br>\n";
print_r(getCurrentDir("img"));
echo "</p>";
*/
?>
<div id="folderListWarpper" class="nc">
<div id="folderList"><div id="folderListHead">
<p>Currently open directory : <?php if($_GET["p"] != null) {
	foreach (getSubDirList("img","list") as $e) {
		if ($_GET["p"] == $e[0]) {echo substr($_GET["p"],0,-1);}
	}
}?></p>
<button class="button">Close</button>
</div></div>
</div>
</body>
<link type="text/css" rel="stylesheet" href="style.css">
<?php 
$pic = array();
$path = "img/";
if($_GET["p"] != null) {
	foreach (getSubDirList("img","list") as $e) {
		if ($_GET["p"] == $e[0]) {$path = $_GET["p"];}
	}
}
foreach(glob($path."*.*") as $file) {
	if(preg_match('/(png|jpg|jpeg)/i', $file)) {
		array_push($pic,$file);
	}
}


echo "<script type=\"text/javascript\">";
if ($_GET["fc"] !== "true") {echo "document.querySelector(\"#folderListWarpper\").style.display = \"block\";";}
echo "folder = {all: ".str_replace("\\/","/",json_encode(getCurrentDir("img")["allDirList"], JSON_UNESCAPED_UNICODE)).", valid: ".str_replace("\\/","/",json_encode(getCurrentDir("img")["allDirValid"], JSON_UNESCAPED_UNICODE)).", notValid: ".str_replace("\\/","/",json_encode(getCurrentDir("img")["allDirNotValid"], JSON_UNESCAPED_UNICODE))."};";
echo "pic = ".str_replace("\\/","/",json_encode($pic, JSON_UNESCAPED_UNICODE)).";</script>";
?>
<script src="script.js"></script>
</html>