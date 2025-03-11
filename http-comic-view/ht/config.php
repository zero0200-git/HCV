<?php

// Image folder location
// default: "img/"
$MAIN = "img/";

// Only show folder that name included these (still have access other folder from url)
// add world by include "," at the end of word, include "," in word by add "\" before "," ("\,")
// ex: "    not, me,i will   ,  not\, or is it?"
//     will be ==> "not" | "me" | "i will" | "not\, or is it?"
// default: null
$inclWS = null;

// Not show folder that name included these (still have access from url)
// add world by include "," at the end of word, include "," in word by add "\" before "," ("\,")
// ex: "    not, me,i will   ,  not\, or is it?"
//     will be ==> "not" | "me" | "i will" | "not\, or is it?"
// default: null
$blockWS = null;

// Client settings list and value
$settingsConfig = <<<JSON
{
"fullscreenSwitch": {
	"fullname": "Fullscreen",
	"clientEnable": true,
	"value": false
},
"uzSwitch": {
	"fullname": "Unlock Zoom",
	"clientEnable": true,
	"value": false
},
"prePrev": {
	"fullname": "Image Preload(previous)",
	"clientEnable": true,
	"value": "2"
},
"preNext": {
	"fullname": "Image Preload(next)",
	"clientEnable": true,
	"value": "5"
},
"imgTap": {
	"fullname": "Screen Tapping",
	"clientEnable": true,
	"value": "rl"
},
"pnSwitch": {
	"fullname": "Auto Change Folder",
	"clientEnable": true,
	"value": true
},
"curPathSwitch": {
	"fullname": "Show folder full path",
	"clientEnable": true,
	"value": false
},
"curDisSwitch": {
	"fullname": "Show picture fullname",
	"clientEnable": true,
	"value": false
},
"onlineFirst": {
	"fullname": "Show online data first",
	"clientEnable": true,
	"value": false
},
"displayAllSwitch": {
	"fullname": "Display all folder",
	"clientEnable": true,
	"value": false
},
"folderRecusiveSwitch": {
	"fullname": "Display recusive folder",
	"clientEnable": true,
	"value": false
},
"displayFromParentSwitch": {
	"fullname": "Display from parent folder",
	"clientEnable": true,
	"value": false
},
"imgFirstSwitch": {
	"fullname": "Show image folder first",
	"clientEnable": true,
	"value": true
},
"imgFolderSwitch": {
	"fullname": "Show image in folder Select",
	"clientEnable": true,
	"value": true
},
"popSwitch": {
	"fullname": "Show loading popup",
	"clientEnable": true,
	"value": false
},
"disableAnimation": {
	"fullname": "Disable animation",
	"clientEnable": true,
	"value": false
},
"animationTime": {
	"fullname": "Animation time",
	"clientEnable": true,
	"value": "400"
},
"hideNaviSwitch": {
	"fullname": "Hide \\"hide navigation\\" button",
	"clientEnable": true,
	"value": true
},
"autoHideNaviSwitch": {
	"fullname": "Auto hide navigation",
	"clientEnable": true,
	"value": true
},
"autoHideNaviTouchSwitch": {
	"fullname": "Auto hide navigation(touchscreen)",
	"clientEnable": true,
	"value": false
},
"lcSettingsSwitch": {
	"fullname": "Save settings",
	"clientEnable": true,
	"value": true
},
"lcReadSwitch": {
	"fullname": "Save read progress",
	"clientEnable": true,
	"value": false
},
"infoRBG": {
	"fullname": "Read progress background color",
	"clientEnable": true,
	"value": "#000000"
},
"infoIBG": {
	"fullname": "Image count background color",
	"clientEnable": true,
	"value": "#000000"
},
"infoFBG": {
	"fullname": "Folder count background color",
	"clientEnable": true,
	"value": "#000000"
},
"twoPageSwitch": {
	"fullname": "Display two page",
	"clientEnable": true,
	"value": false
},
"twoPageOffsetSwitch": {
	"fullname": "Display two page offset",
	"clientEnable": true,
	"value": false
},
"twoPageSideSwitch": {
	"fullname": "Display two page invert",
	"clientEnable": true,
	"value": true
},
"imgDisplayType": {
	"fullname": "Image display type",
	"clientEnable": true,
	"value": "normal"
},
"imgSize": {
	"fullname": "Image scale",
	"clientEnable": true,
	"value": "100"
},
"imgPos": {
	"fullname": "Image position",
	"clientEnable": true,
	"value": "c"
},
"dirLimit": {
	"fullname": "Folder display limit",
	"clientEnable": true,
	"value": "30"
},
"uiSize": {
	"fullname": "UI scale",
	"clientEnable": true,
	"value": "100"
},
"naviLocation": {
	"fullname": "Navigation bar location",
	"clientEnable": true,
	"value": "t"
},
"naviStyle": {
	"fullname": "Navigation bar style",
	"clientEnable": true,
	"value": "t"
},
"expRead": {
	"fullname": "Export read",
	"clientEnable": true,
	"value": "read"
},
"impRead": {
	"fullname": "Import Read",
	"clientEnable": true,
	"value": "read"
},
"expSettings": {
	"fullname": "Export settings",
	"clientEnable": true,
	"value": "settings"
},
"impSettings": {
	"fullname": "Import settings",
	"clientEnable": true,
	"value": "settings"
},
"dlqOpen": {
	"fullname": "Open Download queue",
	"clientEnable": true,
	"value": ""
},
"dlOpen": {
	"fullname": "Open Downloaded",
	"clientEnable": true,
	"value": ""
},
"offineEnable": {
	"fullname": "Enable offline mode",
	"clientEnable": true,
	"value": true
},
"offineUninstall": {
	"fullname": "Uninstall/Update offline mode",
	"clientEnable": true,
	"value": ""
},
"reloadWeb": {
	"fullname": "Reload Website",
	"clientEnable": true,
	"value": ""
},
"deleteAllCache": {
	"fullname": "Clear offline mode all cache",
	"clientEnable": true,
	"value": ""
},
"deleteCoreCache": {
	"fullname": "Clear offline mode core cache",
	"clientEnable": true,
	"value": ""
},
"deleteOtherCache": {
	"fullname": "Clear offline mode other cache",
	"clientEnable": true,
	"value": ""
},
"deleteImageCache": {
	"fullname": "Clear offline mode image cache",
	"clientEnable": true,
	"value": ""
},
"storageRemaining": {
	"fullname": "Storage for web remaining",
	"clientEnable": true,
	"value": ""
},
"includeWord": {
	"fullname": "Folder name whitelist",
	"clientEnable": true,
	"value": ""
},
"blockWord": {
	"fullname": "Folder name blacklist",
	"clientEnable": true,
	"value": ""
},
"titleText": {
	"fullname": "Custom title text of page",
	"clientEnable": true,
	"value": "_{page}_ | _{name}_ - _{prna}_ - Comic view"
},
"errorNote": {
	"fullname": "In case of error or long loading...",
	"clientEnable": true
},
"version": {
	"fullname": "HCV Version: 1.3.1.3",
	"clientEnable": true
},
"keyHide": {
	"fullname": "Hide UI",
	"clientEnable": true,
	"value": [["SHIFT","Escape"],["H"]]
},
"keyFolder": {
	"fullname": "Toggle folder",
	"clientEnable": true,
	"value": [["SHIFT","F"]]
},
"keySettings": {
	"fullname": "Toggle settings",
	"clientEnable": true,
	"value": [["SHIFT","J"]]
},
"keyGoto": {
	"fullname": "Toggle goto",
	"clientEnable": true,
	"value": [["G"]]
},
"keyPrev": {
	"fullname": "Previous Image",
	"clientEnable": true,
	"value": [["ArrowLeft"],["A"]]
},
"keyNext": {
	"fullname": "Next Image",
	"clientEnable": true,
	"value": [["ArrowRight"],["D"]]
},
"keyFullscreen": {
	"fullname": "Fullscreen",
	"clientEnable": true,
	"value": [["CTRL,F"]]
},
"keyAutoFolder": {
	"fullname": "Auto change folder",
	"clientEnable": true,
	"value": [["CTRL,SHIFT,F"]]
},
"keyPopup": {
	"fullname": "Loading popup",
	"clientEnable": true,
	"value": [["P"]]
}
}
JSON;
?>