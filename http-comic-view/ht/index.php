<!DOCTYPE html><html lang="en">
<head><title>Comic view</title><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes">
<?php if($_SERVER['HTTPS']&&$_SERVER['HTTPS']==='on'){echo '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">';}
function stSwitch($category,$name,$desc,$stName,$enable=null){
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$e=strtolower($enable);
if($e==true||$e=="true"||$e==1||$e=="check"||$e=="checked"){$e="checked";}else{$e="";}
return '<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="switch" data-settings-name="'.$j.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><div class="switchCon"><label class="switch" tabindex="0"><input type="checkbox" id="'.$j.'"'.$e.'><span class="sli"></span></label></div></div>';
}
function svg($name){
$name=strtolower($name);
$re='';
if($name=='close'){$re='<svg viewBox="0 0 32 32"><path d="M4,4 l24,24 m-24,0 l24,-24"></path></svg>';}
if($name=='reload'){$re='<svg viewBox="0 0 32 32"><path d="m28.4,16 l-4,-2 l4,2 l2,-4z m-0.4,0 a12 12,0,0,0,-12 -12 a12 12,0,0,0,0 24"></path></svg>';}
return $re;
}
function stSelect($category,$name,$desc,$stName,$itemArray,$defaultKey=null){
if(is_array($itemArray)!=true){return;}
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$a=$itemArray;$k=array_keys($a);
if(array_key_exists($defaultKey,$a)==true){$dk=$defaultKey;}else{$dk=$k[0];}

$re='<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="select" data-settings-name="'.$j.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><div class="selectCon" id="'.$j.'"><div class="seTed buttonText" tabindex="0" data-selected-key="'.$dk.'">'.$a[$dk].'</div><div class="seCon">';
foreach($k as $kn){if($dk==$kn){$re.='<div class="seCC seced" tabindex="0" data-key="'.$kn.'">'.$a[$kn].'</div>';}else{$re.='<div class="seCC" tabindex="0" data-key="'.$kn.'">'.$a[$kn].'</div>';}}
$re.="</div></div></div>";
return $re;
}
function stColor($category,$name,$desc,$stName,$elQuery,$elCSS,$defultColor=null){
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$q=$elQuery;$s=$elCSS;$dc=strtolower($defultColor);
if($dc!=null||$dc!=""||(substr($dc,0,1)=="#"||substr($dc,0,4)=="rgb("||substr($dc,0,5)=="rgba(")==false){$dc="";}else{$dc=" value=\"$dc\"";}
return '<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="color" data-settings-name="'.$j.'" data-css-query="'.$q.'" data-el-css="'.$s.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><input type="color" class="color" id="'.$j.'"'.$dc.' tabindex="0"></div>';
}
function stDataExport($category,$name,$desc,$stName,$displayText,$varName){
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$t=$displayText;$v=$varName;
return '<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="dataExport" data-settings-name="'.$j.'" data-hcv-var="'.$v.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><div class="buttonCon"><button class="buttonText" id="'.$j.'" tabindex="0">'.$t.'</button></div></div>';
}
function stDataimport($category,$name,$desc,$stName,$displayText,$varName){
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$t=$displayText;$v=$varName;
return '<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="dataImport" data-settings-name="'.$j.'" data-hcv-var="'.$v.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><div class="fileCon"><label class="buttonText" tabindex="0"><input type="file" id="'.$j.'" accept=".json">'.$t.'</label><button class="buttonText">Merge!</button></div></div>';
}
function stKey($category,$name,$desc,$stName,$keyArray,$funcName){
if(is_array($keyArray)!=true){return;}
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$k=$keyArray;$f=$funcName;

$re='<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="shortkey" data-settings-name="'.$j.'" data-func="'.$f.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><div class="keysCon"><div class="keys">';
foreach($k as $set){if(count($set)>0){$re.='<button class="buttonText" data-keys="';
$t=0;foreach($set as $key){$t++;$re.=$key;if(count($set)>$t){$re.=',';}}$re.='" tabindex="0">';
$t=0;foreach($set as $key){$t++;$re.=$key;if(count($set)>$t){$re.=' + ';}}$re.='</button>';}}
$re.='</div><button class="buttonText" tabindex="0">Add new key</button></div></div>';
return $re;
}
function stText($category,$name,$desc,$stName,$value="",$displayText=null){
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$v=$value;$t=$displayText;
return '<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="text" data-settings-name="'.$j.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><div class="textCon"><textarea class="buttonText" id="'.$j.'" placeholder="'.$t.'" tabindex="0">'.$v.'</textarea></div></div>';
}
function stNote($category,$name,$desc,$stName){
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;
return '<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="note" data-settings-name="'.$j.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div></div>';
}
function stFuncButton($category,$name,$desc,$stName,$displayText,$funcName){
$c=$category;$n=str_replace("\n","<br>",htmlentities($name,ENT_QUOTES));$d=htmlentities($desc,ENT_QUOTES);$j=$stName;$t=$displayText;$f=$funcName;
return '<div class="settingsList" data-settings-category="'.$c.'" data-settings-type="funcButton" data-settings-name="'.$j.'" data-func="'.$f.'"><div class="settingsName" tabindex="0" title="'.$d.'"><div>'.$n.'</div><div>'.str_replace("\n","<br>",$d).'</div></div><div class="buttonCon"><button class="buttonText" id="'.$j.'" tabindex="0">'.$t.'</button></div></div>';
}

?><link rel="apple-touch-icon" href="icons/favicon-180x180.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="64x64" href="icons/favicon-64x64.png">
<link rel="icon" type="image/png" sizes="128x128" href="icons/favicon-128x128.png">
<link rel="icon" type="image/png" sizes="256x256" href="icons/favicon-256x256.png">
<link rel="icon" type="image/png" sizes="512x512" href="icons/favicon-512x512.png">
<link rel="icon" type="image/png" href="icons/favicon.png">
<link rel="manifest" href="manifest.json"></head>
<body><div class="loading"style="position:fixed;background:#000;top:0;bottom:0;left:0;right:0;z-index:10000;text-align:center;">Loading ...<script>function load(){document.removeEventListener("DOMContentLoaded",load);load=undefined;setTimeout(function(){document.querySelector(".loading").remove()},600)};document.addEventListener("DOMContentLoaded",load)</script></div>
<div class="nc t" id="navWarpper" data-hide="false">
<button class="button" id="prev"><svg viewBox="0 0 24 24"><path d="M20,3 l-16,9 l16,9"/></svg></button>
<button class="button" id="gotoOpen"><span data-value="current">N</span><span data-value="space">/</span><span data-value="all">A</span></button>
<button class="button" id="next"><svg viewBox="0 0 24 24"><path d="M3,3 l16,9 l-16,9"/></svg></button>
<button class="button" id="folderOpen"><svg viewBox="0 0 32 32"><path d="m28,13 v12 a1 1,0,0,1,-1 1 h-22 a1 1,0,0,1,-1 -1 v-19 a1 1,0,0,1,1 -1 h8 a0.75 0.5,0,0,1,0.75 0.5 l1,2 a0.75 0.5,0,0,0,0.75 0.5 h11.5 a1 1,0,0,1,1 1z h-24"/></svg></button>
<button class="button" id="settingsOpen"><svg viewBox="0 0 32 32"><path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"/></svg></button>
<div class="navHide">
<button class="button"><svg viewBox="0 0 24 24"><path d="M2,12 h20"/></svg></button>
<button class="button" style="display:none;"><svg viewBox="0 0 24 24"><path d="M2,12 h20 m-10,-10 v20"/></svg></button>
</div>
</div>

<div id="gotoWarpper" class="containerWarpper">
<div class="nc container">
<div class="containerHead">
<div class="containerTitle"><label for="goto">Go to Page: </label></div>
<div class="containerControl"><button class="button" id="gotoClose" title="Close"><?php echo svg('close');?></button>
</div></div><div class="containerCon">
<input type="number" id="goto" class="button" placeholder="Goto page eg. '8','13','48'"/>
</div></div></div>

<div id="settingsWarpper" class="containerWarpper">
<div class="nc container">
<div class="containerHead">
<div class="containerTitle">Setting</div>
<div class="containerControl"><button class="button" id="settingsClose" title="Close"><?php echo svg('close');?></button>
</div></div><div class="containerCon scFlex"><?php
require "config.php";
require "settings.php";
$settings=[];
$settingsD=json_decode($settingsDefault,true);
$settingsC=json_decode($settingsConfig,true);
$key = array_keys($settingsD);
foreach($key as $name){
if(is_array($settingsC[$name])==true){$settings[$name]=array_merge($settingsD[$name],$settingsC[$name]);}
else{$settings[$name]=$settingsD[$name];}
}

foreach(array_keys($settings) as $stname){
$type=$settings[$stname]["type"];
$category=$settings[$stname]["category"];
$fullname=$settings[$stname]["fullname"];
$description=$settings[$stname]["description"];
$tags=$settings[$stname]["tags"];
$name=$settings[$stname]["name"];
if($settings[$stname]["clientEnable"]!=true||(($_SERVER['HTTPS']&&$_SERVER['HTTPS']==='on')!=true&&in_array("service",$tags))){continue;}
else if($type=="switch"){echo stSwitch($category, $fullname, $description, $name, $settings[$stname]["value"]);}
else if($type=="select"){echo stSelect($category, $fullname, $description, $name, $settings[$stname]["selection"], $settings[$stname]["value"]);}
else if($type=="color"){echo stColor($category, $fullname, $description, $name, $settings[$stname]["query"], $settings[$stname]["css"], $settings[$stname]["value"]);}
else if($type=="dataImport"){echo stDataimport($category, $fullname, $description, $name, $settings[$stname]["display"], $settings[$stname]["value"]);}
else if($type=="dataExport"){echo stDataExport($category, $fullname, $description, $name, $settings[$stname]["display"], $settings[$stname]["value"]);}
else if($type=="key"){echo stKey($category, $fullname, $description, $name, $settings[$stname]["value"], $settings[$stname]["function"]);}
else if($type=="text"){echo stText($category, $fullname, $description, $name, $settings[$stname]["value"], $settings[$stname]["display"]);}
else if($type=="note"){echo stNote($category, $fullname, $description, $name);}
else if($type=="funcButton"){echo stFuncButton($category, $fullname, $description, $name, $settings[$stname]["display"], $settings[$stname]["function"]);}
}
?>
</div>
<div class="containerSubHead">
<div class="settingsCat"></div><button class="buttonText" id="settingsApply">Apply</button>
</div>
</div></div>

<div id="dlqWarpper" class="containerWarpper">
<div class="nc container">
<div class="containerHead">
<div class="containerTitle">Download queue</div>
<div class="containerControl"><button class="button" id="dlqClose" title="Close"><?php echo svg('close');?></button>
<button class="button" id="dlqReload" title="Reload queue"><?php echo svg('reload');?></button>
</div></div><div class="containerCon scFlex">
</div>
<div class="containerSubHead">
<div class="dlqAction"><button class="buttonText" id="dlqStart">Start Download</button><button class="buttonText" id="dlqStop">Stop Download</button></div>
</div>
</div></div>

<div id="dlWarpper" class="containerWarpper">
<div class="nc container">
<div class="containerHead">
<div class="containerTitle">Download</div>
<div class="containerControl"><button class="button" id="dlClose" title="Close"><?php echo svg('close');?></button>
<button class="button" id="dlReload" title="Reload list"><?php echo svg('reload');?></button>
</div></div><div class="containerCon scFlex">
</div>
<div class="containerSubHead">
<input type="text" id="dlFilter" class="buttonText" placeholder="Search here">
<button class="buttonText" id="dlFilterButton">Search</button>
<div id="dlSize">	Displaying: N/A</div>
</div>
</div></div>

<div id="folderListWarpper" class="nc containerWarpper">
<div class="container"><div class="containerHead">
<div class="containerTitle">Opening: <span id="currentFolder"></span><br><span id="currentDisplayP" style="display:none;">Displaying: <span id="currentDisplay"></span></span></div>
<div class="containerControl"><button class="button" id="folderClose" title="Close"><?php echo svg('close');?></button>
<button class="button" id="folderReload" title="Reload folder list"><?php echo svg('reload');?></button>
<button class="button" id="folderGoBack" title="Go back to upper folder"><svg viewBox="0 0 32 32"><path d="m16,4 l-6,6 l6,-6 l6,6 z v24"/></svg></button>
<button class="button" id="folderSettings" title="Folder display settings" style="display:none"><svg viewBox="0 0 32 32"><path d="m28,13 v12 a1 1,0,0,1,-1 1 h-22 a1 1,0,0,1,-1 -1 v-19 a1 1,0,0,1,1 -1 h8 a0.75 0.5,0,0,1,0.75 0.5 l1,2 a0.75 0.5,0,0,0,0.75 0.5 h11.5 a1 1,0,0,1,1 1z m-20.5,-1.5 l3,5 v6 h3 v-6 l3,-5z m10,3 h8z m0,3 h6z m0,3 h4z"/></svg></button></div>
</div><div class="containerCon scFlex"><div id="folderListSettings"></div><div id="folderListContainer"></div></div>
<div class="containerSubHead"></div>
</div></div>

<div id="popWarpper" class="nc" style="display:none;"></div>

<div id="imgWarpper" data-img-size="100">
<div class="imgContainer nc"></div></div>

</body>
<link type="text/css" rel="stylesheet" href="style.css">
<?php if($_GET["fc"]!=="true"){echo "<script type=\"text/javascript\">document.querySelector(\"#folderListWarpper\").classList.add(\"show\");</script>";}?><script src="script.js"></script>
</html>