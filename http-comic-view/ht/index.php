 <!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes">
<title>Comic view</title>
<body>
<div class="nc" id="navWarpper">
<button class="button" id="prev" style="margin-left:auto;"><svg viewBox="0 0 10 10">
<path d="M7,1 l-5,4 l5,4"/></svg></button>
<button class="button" id="gotoOpen"><div id="cur">0 / 0</div></button>
<button class="button" id="next"><svg viewBox="0 0 10 10">
<path d="M3,1 l5,4 l-5,4"/></svg></button>
<button class="button" id="folderOpen"><svg viewBox="0 0 32 32">
<path d="M2 13v-6.008c0-0.537 0.444-0.992 0.992-0.992h10.408l1.96 4h12.637c0.549 0 1.003 0.448 1.003 1.001v1.999h-27zM2 14h27v10.999c0 0.556-0.445 1.001-0.993 1.001h-25.014c-0.547 0-0.993-0.444-0.993-0.992v-11.008zM16 9l-2-4h-10.997c-1.106 0-2.003 0.89-2.003 1.991v18.018c0 1.1 0.9 1.991 1.993 1.991h25.013c1.101 0 1.993-0.893 1.993-1.995v-14.010c0-1.102-0.897-1.995-2.006-1.995h-11.994z"/>
</svg></button>
<button class="button" id="settingsOpen" style="margin-right:auto;"><svg viewBox="0 0 32 32">
<path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"/>
</svg></button>
<button class="button" id="navHideColl"><svg viewBox="0 0 10 10">
<path d="M1,5 9,5"/>
</svg></button>
<button class="button" id="navHideEx" style="margin-left:auto;display:none;"><svg viewBox="0 0 10 10">
<path d="M1,5 9,5M5,1 5,9"/>
</svg></button>
</div>

<div id="gotoWarpper" class="containerWarpper">
<div id="gotoContainer" class="nc container">
<div class="gotoNode"><label for="goto">Go to Page: </label><button class="button" id="gotoClose">Close</button></div>
<div class="gotoNode"><input type="number" id="goto" class="button"/></div>
</div></div>

<div id="settingsWarpper" class="containerWarpper">
<div id="settingsContainer" class="nc container">
<div class="settingsList"><span class="settingsNode"></span><button class="button" id="settingsClose">Close</button></div>
<div class="settingsList">
<span class="settingsNode">Fullscreen</span>
<div class="switchCon"><label id="fullscreenSwitch" class="switch settingsNode">
<input type="checkbox"><span class="sli"></span></label></div>
</div>
<div class="settingsList">
<span class="settingsNode">L R Switch</span>
<div class="switchCon"><label id="lrSwitch" class="switch settingsNode">
<input type="checkbox" checked><span class="sli"></span></label></div>
</div>
<div class="settingsList">
<span class="settingsNode">L R Invert</span>
<div class="switchCon"><label id="lrInvSwitch" class="switch settingsNode">
<input type="checkbox"><span class="sli"></span></label></div>
</div>
<div class="settingsList">
<span class="settingsNode">Unlock Zoom(Mobile | May not work)</span>
<div class="switchCon"><label id="uzSwitch" class="switch settingsNode">
<input type="checkbox"><span class="sli"></span></label></div>
</div>
<div class="settingsList">
<span class="settingsNode">Show current picture name</span>
<div class="switchCon"><label id="curSwitch" class="switch settingsNode">
<input type="checkbox"><span class="sli"></span></label></div>
</div>
<div class="settingsList">
<span class="settingsNode">Image size</span>
<div class="settingsNode" id="imgSize"><button class="button">Full Width</button><button class="button">100%</button><button class="button">80%</button><button class="button">60%</button><button class="button">50%</button><button class="button">35%</button><button class="button">25%</button><button class="button">15%</button></div>
</div>
<div class="settingsList">
<span class="settingsNode">Image position(May not work)</span>
<div class="settingsNode" id="imgPos"><button class="button">Top Left</button><button class="button">Top</button><button class="button">Top Right</button><br><button class="button">Left</button><button class="button">Center</button><button class="button">Right</button><br><button class="button">Bottom Left</button><button class="button">Bottom</button><button class="button">Bottom Right</button></div>
</div></div>

</div>
<div id="imgWarpper">
<div class="L nc"></div><div class="R nc"></div>
<div class="imgContener nc"></div></div>
<div id="folderListWarpper" class="nc containerWarpper">
<div id="folderList" class="container"><div id="folderListHead">
<div><p>Currently open directory: <span id="currentFolder"></span></p><p id="currentDisplayP" style="display:none;">Currently display Picture: <span id="currentDisplay"></span></p></div>
<div><button class="button" id="folderClose">Close</button><button class="button" id="folderRefresh">Refresh</button></div>
</div><div id="folderListContainer"></div>
</div></div>
</body>
<link type="text/css" rel="stylesheet" href="style.css">
<?php if ($_GET["fc"] !== "true") {echo "<script type=\"text/javascript\">document.querySelector(\"#folderListWarpper\").style.display = \"block\";</script>";}?>
<script src="script.js"></script>
</html>