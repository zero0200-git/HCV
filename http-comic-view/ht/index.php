<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes">
<title>Comic view</title><?php 
function stSwitch($name,$jsSwName,$enable=null){
$enable=strtolower($enable);if(($enable==true)||($enable=="true")||($enable==1)||($enable=="check")||($enable=="checked")){$enable="checked";}else{$enable="";}
return '<div class="settingsList"><span>'.$name.'</span><div class="switchCon"><label id="'.$jsSwName.'" class="switch" tabindex="0"><input type="checkbox"'.$enable.'><span class="sli"></span></label></div></div>'."\n";
}
function svg($name) {
$name=strtolower($name);
$re='';
if($name=='close'){$re='<svg viewBox="0 0 32 32"><path d="M4,4 l24,24 m-24,0 l24,-24"></path></svg>';}
return $re;
}
function selector($itemArray,$defaultKey=null,$jsName=null){
if(is_array($itemArray)!=true){return ;}
$a=$itemArray;$k=array_keys($a);
if($jsName!=null){$n=' id="'.$jsName.'"';}else{$n='';}
if(array_key_exists($defaultKey,$a)==true){$d=$defaultKey;}else{$d=$k[0];}

$re='<select'.$n.'>';
foreach($k as $kn){
if($d==$kn){$re.='<option value="'.$kn.'" selected>'.$a[$kn].'</option>';}
else{$re.='<option value="'.$kn.'">'.$a[$kn].'</option>';}
}
$re.="</select>";
return $re;
}
function stSelect($title,$jsName,$itemArray,$defaultKey=null){
if(is_array($itemArray)!=true){return ;}
$t=$title;$j=$jsName;$a=$itemArray;$k=array_keys($a);
if($jsName!=null){$n=' id="'.$jsName.'"';}else{$n='';}
if(array_key_exists($defaultKey,$a)==true){$d=$defaultKey;;}else{$d=$k[0];}
$sk=' data-selected-key="'.$d.'"';

$re='<div class="settingsList"><span>'.$t.'</span><div class="selectCon"'.$n.'>'.selector($a,$d).'<div class="seTed" tabindex="0"'.$sk.'>'.$a[$d].'</div><div class="seCon">';
foreach($k as $kn){if($d==$kn){$re.='<div class="seCC seced" tabindex="0" data-key="'.$kn.'">'.$a[$kn].'</div>';}else{$re.='<div class="seCC" tabindex="0" data-key="'.$kn.'">'.$a[$kn].'</div>';}}
$re.="</div></div></div>\n";
return $re;
}

?>
<body><div class="loading"style="position:fixed;background:#000;top:0;bottom:0;left:0;right:0;z-index:10000;text-align:center;">Loading ...<script>function load(){document.removeEventListener("DOMContentLoaded",load);load=undefined;document.querySelector(".loading").remove()};document.addEventListener("DOMContentLoaded",load)</script></div>
<div class="nc" id="navWarpper">
<button class="button" id="prev" style="margin-left:auto;"><svg viewBox="0 0 24 24"><path d="M20,3 l-16,9 l16,9"/></svg></button>
<button class="button" id="gotoOpen"><div id="cur">0 / 0</div></button>
<button class="button" id="next"><svg viewBox="0 0 24 24"><path d="M3,3 l16,9 l-16,9"/></svg></button>
<button class="button" id="folderOpen"><svg viewBox="0 0 32 32"><path d="M2 13v-6.008c0-0.537 0.444-0.992 0.992-0.992h10.408l1.96 4h12.637c0.549 0 1.003 0.448 1.003 1.001v1.999h-27zM2 14h27v10.999c0 0.556-0.445 1.001-0.993 1.001h-25.014c-0.547 0-0.993-0.444-0.993-0.992v-11.008zM16 9l-2-4h-10.997c-1.106 0-2.003 0.89-2.003 1.991v18.018c0 1.1 0.9 1.991 1.993 1.991h25.013c1.101 0 1.993-0.893 1.993-1.995v-14.010c0-1.102-0.897-1.995-2.006-1.995h-11.994z"/></svg></button>
<button class="button" id="settingsOpen" style="margin-right:auto;"><svg viewBox="0 0 32 32"><path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"/></svg></button>
<button class="button" id="navHideColl"><svg viewBox="0 0 24 24"><path d="M2,12 h20"/></svg></button>
<button class="button" id="navHideEx" style="display:none;"><svg viewBox="0 0 24 24"><path d="M2,12 h20 m-10,-10 v20"/></svg></button>
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
echo stSwitch("Fullscreen","fullscreenSwitch");
echo stSwitch("Unlock Zoom(Mobile | May not work)","uzSwitch");
echo stSwitch("L R Switch","lrSwitch",true);
echo stSwitch("L R Invert","lrInvSwitch");
echo stSwitch("Go to previous/next folder when click on first/last page","pnSwitch",true);
echo stSwitch("Show full current folder path","curPathSwitch");
echo stSwitch("Show current picture name","curDisSwitch");
echo stSwitch("Display all folder","displayAllSwitch");
echo stSwitch("Show image folder first","imgFirstSwitch",true);
echo stSwitch("Show image in folder list","imgFolderSwitch",true);
echo stSwitch("Show loading popup","popSwitch");
echo stSwitch("Auto hide navigation","autoHideNaviSwitch",true);
echo stSwitch("Auto hide navigation(touchscreen)","autoHideNaviTouchSwitch");
?>
<div class="settingsList">
<span class="settingsNode">Image size</span>
<div class="settingsNode" id="imgSize"><button class="button">Full Width</button><button class="button">Full Height</button><button class="button">100%</button><button class="button">80%</button><button class="button">60%</button><button class="button">50%</button><button class="button">35%</button><button class="button">25%</button><button class="button">15%</button></div>
</div>
<div class="settingsList">
<span class="settingsNode">Image position</span>
<div class="settingsNode" id="imgPos">
<div>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM4,4 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Top Left</svg></button>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM12,4 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Top</svg></button>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM20,4 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Top Right</svg></button>
</div><div>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM4,12 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Left</svg></button>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM12,12 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Center</svg></button>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM20,12 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Right</svg></button>
</div><div>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM4,20 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Bottom Left</svg></button>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM12,20 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Bottom</svg></button>
<button class="button"><svg viewBox="0 0 32 32"><path d="M4,4 h24 v24 h-24zM20,20 h8 v8 h-8z l8,8 m-8,0 l8,-8"></path>Bottom Right</svg></button>
</div>
</div></div>
</div>
</div></div>

<div id="folderListWarpper" class="nc containerWarpper">
<div class="container"><div class="containerHead">
<div class="containerTitle">Opening: <span id="currentFolder"></span><br><span id="currentDisplayP" style="display:none;">Displaying: <span id="currentDisplay"></span></span></div>
<div class="containerControl"><button class="button" id="folderClose" title="Close"><?php echo svg('close');?></button>
<button class="button" id="folderReload" title="Reload folder list"><svg viewBox="0 0 32 32"><path d="m28.4,16l-4,-2 l4,2 l2,-4z m-0.4,0 a12 12,0,0,0,-12 -12 a12 12,0,0,0,0 24"></path></svg></button>
<button class="button" id="folderGoBack" title="Go back to upper folder"><svg viewBox="0 0 32 32"><path d="M16,4 l-6,6 l6,-6 l6,6 z v24"/></svg></button></div>
</div><div class="containerCon scFlex" id="folderListContainer"></div>
</div></div>

<div id="popWarpper" class="nc" style="display:none;"></div>

<div id="imgWarpper">
<div class="L nc"></div><div class="R nc"></div>
<div class="imgContainer nc" data-img-size="100"></div></div>

</body>
<link type="text/css" rel="stylesheet" href="style.css">
<?php if($_GET["fc"]!=="true"){echo "<script type=\"text/javascript\">document.querySelector(\"#folderListWarpper\").classList.add(\"show\");</script>";}?>
<script src="script.js"></script>
</html>